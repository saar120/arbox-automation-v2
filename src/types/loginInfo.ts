export interface LoginResponse {
    data: LoginResponseData
}

export interface LoginResponseData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    image: string;
    token: string;
    refreshToken: string;
    last_name_shorten: string;
    full_name_shorten: string;
    full_name: string;
    is_user: boolean;
}
