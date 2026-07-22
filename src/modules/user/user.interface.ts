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

export interface IManageProfile {
  name?:string,
  address?: string,
  profilePhoto?: string,
  phone?: string
}