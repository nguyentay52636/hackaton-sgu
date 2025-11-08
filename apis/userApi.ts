import baseApi from "./baseApi"

export interface User { 
    _id: string
    name: string
    email: string
    avatar: string
    role: UserRole | string
    savedJobs: string[]
    status: boolean
    createdAt: string
    updatedAt: string
    
    }
    enum UserRole {
        student = "student",
        teacher = "teacher",
        admin = "admin",
        guest = "seeker"
     } 
export const getAllUsers = async () => {
    try {
        const {data} = await baseApi.get<User[]>('/user/')
        return data
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
}     
export const getUserById = async (id: string) => {
    try {
        const {data} = await baseApi.get<User>(`/user/${id}`)
        return data
    } catch (error) {
        console.error('Error fetching user:', error)
        throw error
    }
}
export const createUser = async (user: Partial<User>) => {      
    try {
        const {data} = await baseApi.post<User>('/user/', user)
        return data
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}
export const updateUser = async (id: string, user: Partial<User>) => {
    try {
        const {data} = await baseApi.put<User>(`/user/${id}`, user)
        return data
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}
export const deleteUser = async (id: string) => {
    try {
        const {data} = await baseApi.delete<User>(`/user/${id}`)
        return data
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}