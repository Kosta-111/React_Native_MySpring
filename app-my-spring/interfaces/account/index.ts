export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface IRegister {
    email: string;
    password: string;
    phoneNumber: string | null;
    firstname: string | null;
    lastname: string | null;
}

export interface IJwtPayload {
    name: string;
    email: string;
    phone: string;
    image: string;
    roles: string;
    exp: number;
    // інші поля, якщо є
}