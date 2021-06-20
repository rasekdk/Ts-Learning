export interface userCreationInterface {
    user: string;
    name: string;
    password: string;
    email: string;
}

export interface userUpdateInterface {
    user?: string;
    name?: string;
    password?: string;
    email?: string;
    description?: string;
    site?: string;
    location?: string;
    birth?: string;
    img_url?: string;
    img_bg_url?: string;
}