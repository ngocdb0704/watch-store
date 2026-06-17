import { RoleResponse } from "./role.type";

export interface UserInfo {
    id: string;
    username: string;
    fullName: string;
    role: RoleResponse;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expiredAt: Date;
    userInfo: UserInfo;
}