import { Role } from './../../../generated/prisma/enums';
export interface UserCreateI{
    name : string,
    email: string,
    password: string,
    role: Role,
    profilePhoto?: string
}