import baseApi from "./baseApi";
import { Lesson } from "./lessonApi";

export interface Subject { 
    _id?: string,
    name:string ,
    description:string ,
    lessons : Lesson[],
    teacher: string,
    status: boolean,
    createdAt?: Date,
    updatedAt?: Date,

} 
export const getAllSubjects = async () => {
    try {
        const {data} = await baseApi.get<Subject[]>('/subject/')
        return data
    } catch (error) {
        console.error('Error fetching subjects:', error)
    throw error
}}

export const getSubjectById = async (id: string) => {
    try {
        const {data} = await baseApi.get<Subject>(`/subject/${id}`)
        return data
    } catch (error) {
        console.error('Error fetching subject:', error)
        throw error
    }
}
export const createSubject = async ({name, description, lessons, teacher, status}: Subject) => {
    try {
        const {data} = await baseApi.post<Subject>('/subject/', {name, description, lessons, teacher, status})
        return data
    } catch (error) {
        console.error('Error creating subject:', error)
        throw error
    }
}   
export const updateSubject = async (id: string, {name, description, lessons, teacher, status}: Subject) => {
    try {
        const {data} = await baseApi.put<Subject>(`/subject/${id}`, {name, description, lessons, teacher, status})
        return data
    } catch (error) {
        console.error('Error updating subject:', error)
        throw error
    }
}
export const deleteSubject = async (id: string) => {       
    try {
        const {data} = await baseApi.delete<Subject>(`/subject/${id}`)
        return data
    } catch (error) {
        console.error('Error deleting subject:', error)
        throw error
    }
}
