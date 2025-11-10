import baseApi from "./baseApi"
import { User } from "./userApi"

export interface SessionMessage { 
    _id: string
    sessionId: string
    user: User
    message: string
    messageType: "text" | "image" | "file"
    replyTo: string | null | {
        _id: string
        user: User
        message: string
    }
    isEdited: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}       

export interface SessionMessagesResponse {
    messages: SessionMessage[]
    totalPages: number
    currentPage: number
    total: number
}

/**
 * Get all messages for a specific session
 * GET /api/session-message/:id/messages
 * Backend: router.get("/:id/messages", sessionMessageController.getSessionMessages)
 */
export const getSessionMessages = async (sessionId: string, page: number = 1, limit: number = 50) => {
    try {
        const {data} = await baseApi.get<SessionMessagesResponse>(`session-message/${sessionId}/messages`, {
            params: {
                page,
                limit
            }
        })
        // Backend đã reverse messages để hiển thị từ cũ đến mới
        return data.messages
    } catch (error) {
        console.error('Error fetching session messages:', error)
        throw error
    }
}

/**
 * Create a new message
 * POST /api/session-message/messages
 */
export const createSessionMessage = async (messageData: {
    sessionId: string
    message: string
    messageType?: "text" | "image" | "file"
    replyTo?: string | null
}) => {        
    try {
        const {data} = await baseApi.post<{message: string, data: SessionMessage}>('session-message/messages', messageData)
        return data.data
    } catch (error) {
        console.error('Error creating session message:', error)
        throw error
    }
}

/**
 * Delete a message
 * DELETE /api/session-message/messages/:messageId
 */
export const deleteSessionMessage = async (messageId: string) => {
    try {
        const {data} = await baseApi.delete(`session-message/messages/${messageId}`)
        return data
    } catch (error) {
        console.error('Error deleting session message:', error)
        throw error
    }
}