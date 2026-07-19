import { UserStatus } from "../../../generated/prisma/client";

export interface CategoryI {
  name: string;
  description?: string;
}

export interface UpdateUserStatus {
  status:UserStatus ;
}