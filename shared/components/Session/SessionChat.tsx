'use client';

import { useSessionChat } from '@/features/main/components/Translator/hooks/useSessionChat';
import { useState, useRef, useEffect } from 'react';


interface SessionChatProps {
    sessionId: string;
    currentUserId: string;
}

export const SessionChat = ({ sessionId, currentUserId }: SessionChatProps) => {
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        messages,
        onlineUsers,
        isConnected,
        sendMessage,
        sendTyping,
        typingUsers,
        error,
    } = useSessionChat(sessionId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() && isConnected) {
            sendMessage(inputMessage.trim());
            setInputMessage('');
            sendTyping(false);
        }
    };

    const handleTyping = (value: string) => {
        setInputMessage(value);
        if (value.trim()) {
            sendTyping(true);
        } else {
            sendTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b">
                <h3 className="font-semibold">Session Chat</h3>
                <div className="text-sm text-gray-500">
                    {isConnected ? (
                        <span className="text-green-500">● {onlineUsers.length} online</span>
                    ) : (
                        <span className="text-red-500">Disconnected</span>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.user._id === currentUserId ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.user._id === currentUserId
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {msg.user._id !== currentUserId && (
                                <div className="text-xs font-semibold mb-1">{msg.user.name}</div>
                            )}
                            <div>{msg.message}</div>
                            <div className="text-xs mt-1 opacity-75">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {Object.keys(typingUsers).length > 0 && (
                    <div className="text-sm text-gray-500 italic">
                        {Object.values(typingUsers).join(', ')} đang gõ...
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Error message */}
            {error && (
                <div className="px-4 py-2 bg-red-100 text-red-700 text-sm">{error}</div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => handleTyping(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isConnected}
                    />
                    <button
                        type="submit"
                        disabled={!isConnected || !inputMessage.trim()}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Gửi
                    </button>
                </div>
            </form>
        </div>
    );
};