export interface User {
    username: string;
    password: string;
}

export interface GetUser {
    username: string;
    first_name: string;
    last_name: string;
    role: number;
}