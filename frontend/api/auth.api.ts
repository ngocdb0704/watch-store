import { apiClient } from "@/services/apiClient";
import { ApiResponse } from "@/types/api.type";
import { LoginPayload, LoginResponse } from "@/types/auth.type";


export const loginApi = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post("/api/auth/login", payload);
    return response.data;
}