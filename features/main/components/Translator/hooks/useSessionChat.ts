'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useSocket } from '@/hooks/socket/SocketContext';

interface Message {
  _id: string;
  sessionId: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  message: string;
  messageType: 'text' | 'image' | 'file';
  replyTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface OnlineUser {
  userId: string;
  userName: string;
}

interface UseSessionChatReturn {
  messages: Message[];
  onlineUsers: OnlineUser[];
  isConnected: boolean;
  joinSession: (sessionId: string) => void;
  leaveSession: () => void;
  sendMessage: (message: string, messageType?: 'text' | 'image' | 'file', replyTo?: string) => void;
  editMessage: (messageId: string, newMessage: string) => void;
  deleteMessage: (messageId: string) => void;
  sendTyping: (isTyping: boolean) => void;
  typingUsers: { [userId: string]: string };
  error: string | null;
}

export const useSessionChat = (sessionId: string | null): UseSessionChatReturn => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<{ [userId: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const currentSessionRef = useRef<string | null>(null);
  const typingTimeoutRef = useRef<{ [userId: string]: NodeJS.Timeout }>({});

  // Join session
  const joinSession = useCallback((sessionId: string) => {
    if (!socket || !isConnected) {
      setError('Socket not connected');
      return;
    }

    if (currentSessionRef.current) {
      socket.emit('leave_session', currentSessionRef.current);
    }

    socket.emit('join_session', sessionId);
    currentSessionRef.current = sessionId;
    setError(null);
  }, [socket, isConnected]);

  // Leave session
  const leaveSession = useCallback(() => {
    if (socket && currentSessionRef.current) {
      socket.emit('leave_session', currentSessionRef.current);
      currentSessionRef.current = null;
    }
  }, [socket]);

  // Send message
  const sendMessage = useCallback((message: string, messageType: 'text' | 'image' | 'file' = 'text', replyTo?: string) => {
    if (!socket || !currentSessionRef.current) {
      setError('Not connected to session');
      return;
    }

    socket.emit('send_message', {
      sessionId: currentSessionRef.current,
      message,
      messageType,
      replyTo,
    });
  }, [socket]);

  // Edit message
  const editMessage = useCallback((messageId: string, newMessage: string) => {
    if (!socket || !currentSessionRef.current) {
      setError('Not connected to session');
      return;
    }

    socket.emit('edit_message', {
      messageId,
      newMessage,
      sessionId: currentSessionRef.current,
    });
  }, [socket]);

  // Delete message
  const deleteMessage = useCallback((messageId: string) => {
    if (!socket || !currentSessionRef.current) {
      setError('Not connected to session');
      return;
    }

    socket.emit('delete_message', {
      messageId,
      sessionId: currentSessionRef.current,
    });
  }, [socket]);

  // Typing indicator
  const sendTyping = useCallback((isTyping: boolean) => {
    if (!socket || !currentSessionRef.current) {
      return;
    }

    socket.emit('typing', {
      sessionId: currentSessionRef.current,
      isTyping,
    });
  }, [socket]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleMessageEdited = (data: { messageId: string; newMessage: string; updatedAt: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, message: data.newMessage, updatedAt: data.updatedAt, isEdited: true }
            : msg
        )
      );
    };

    const handleMessageDeleted = (data: { messageId: string }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== data.messageId));
    };

    const handleOnlineUsers = (users: OnlineUser[]) => {
      setOnlineUsers(users);
    };

    const handleUserTyping = (data: { userId: string; userName: string; isTyping: boolean }) => {
      if (data.isTyping) {
        setTypingUsers((prev) => ({ ...prev, [data.userId]: data.userName }));
        
        // Clear typing after 3 seconds
        if (typingTimeoutRef.current[data.userId]) {
          clearTimeout(typingTimeoutRef.current[data.userId]);
        }
        typingTimeoutRef.current[data.userId] = setTimeout(() => {
          setTypingUsers((prev) => {
            const newState = { ...prev };
            delete newState[data.userId];
            return newState;
          });
        }, 3000);
      } else {
        setTypingUsers((prev) => {
          const newState = { ...prev };
          delete newState[data.userId];
          return newState;
        });
      }
    };

    const handleError = (data: { message: string }) => {
      setError(data.message);
    };

    socket.on('new_message', handleNewMessage);
    socket.on('message_edited', handleMessageEdited);
    socket.on('message_deleted', handleMessageDeleted);
    socket.on('online_users', handleOnlineUsers);
    socket.on('user_typing', handleUserTyping);
    socket.on('error', handleError);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('message_edited', handleMessageEdited);
      socket.off('message_deleted', handleMessageDeleted);
      socket.off('online_users', handleOnlineUsers);
      socket.off('user_typing', handleUserTyping);
      socket.off('error', handleError);
    };
  }, [socket]);

  // Auto join when sessionId changes
  useEffect(() => {
    if (sessionId && isConnected) {
      joinSession(sessionId);
    }

    return () => {
      if (currentSessionRef.current) {
        leaveSession();
      }
    };
  }, [sessionId, isConnected, joinSession, leaveSession]);

  return {
    messages,
    onlineUsers,
    isConnected,
    joinSession,
    leaveSession,
    sendMessage,
    editMessage,
    deleteMessage,
    sendTyping,
    typingUsers,
    error,
  };
};  