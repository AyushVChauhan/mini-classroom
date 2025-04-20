export type ApiResponse<T> = {
    data: T;
    success: boolean;
};

export type User = {
    name: string;
    email: string;
    role: string;
};
