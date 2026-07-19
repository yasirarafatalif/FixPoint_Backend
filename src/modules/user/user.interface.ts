import { LogInRole } from './../../../generated/prisma/enums';
export interface UserCreateI{
    name : string,
    email: string,
    password: string,
    role: LogInRole,
    profileImage?: string
    phone?: string,
    address?: string
}