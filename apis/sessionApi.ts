import baseApi from "./baseApi"
import { SessionMessage } from "./sessionMessage"

export interface Session {
    _id: string
    title: string
    description: string
    type: "video" | "audio" | "text" | "pdf"
    language: "vi" | "en"
    contentUrl: string
    textContent: string
    subtitles: string
    subject: string 
    sessionsMessages: SessionMessage[]
    createdAt: Date
    updatedAt: Date
  }

export const createSession = async (session: Session) => {
    try {
        const {data} = await baseApi.post<Session>('session', session)
        return data
    } catch (error) {
        console.error('Error creating session:', error)
        throw error
    }
 } 
 export const getSession = async (sessionId: string) => {
    try {
        const {data} = await baseApi.get<Session>(`session/${sessionId}`)
        return data
    } catch (error) {
        console.error('Error getting session:', error)
        throw error
    }
 }
 export const updateSession = async (sessionId: string, session: Session) => {
    try {
        const {data} = await baseApi.put<Session>(`session/${sessionId}`, session)
        return data
    } catch (error) {
        console.error('Error updating session:', error)
        throw error
    }
 }
 export const deleteSession = async (sessionId: string) => {   
    try {
        const {data} = await baseApi.delete<Session>(`session/${sessionId}`)
        return data
    } catch (error) {
        console.error('Error deleting session:', error)
        throw error
    }
 }
 export const getSessionsById = async (id:string) => {
    try {
        const {data} = await baseApi.get<Session>(`session/${id}`)
        return data
    } catch (error) {
        console.error('Error getting session by id:', error)
        throw error
    }
 }