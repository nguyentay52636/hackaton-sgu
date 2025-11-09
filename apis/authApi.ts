import baseApi from "./baseApi";

export interface User {
    
    _id: string
    name: string
    email?: string
    password?: string
    description?: string
    address?: string
    dateOfBirth?: string
    gender?: string
    role: UserRole
    avatar?: string
    createdAt: Date
    updatedAt: Date
}
export type UserRole = "student" | "teacher" | "admin" | "guest"

export interface LoginResponseData {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    accessToken: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginResponseData;
    error: null | string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => { 
try {
    const response = await baseApi.post<LoginResponse>("/auth/login", { email, password });
    return response.data;
} catch (error: any) {
    console.error("Error logging in:", error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Đăng nhập thất bại';
    throw new Error(errorMessage);
}
} 
export const register = async ({name, email, password, role}: {name: string; email: string; password: string; role: UserRole}) => { 
try {
    const user = {
        name,
        email,
        password,
        role: role || "student",
    } 
    const response = await baseApi.post<User>("/auth/register", user);
    return response.data;
}catch(error: any){
    console.error("Error registering:", error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Đăng ký thất bại';
    throw new Error(errorMessage);
}
} 