import { IUser } from "./index.js";

export interface ILoginResponse {
  token: string;
  user: Omit<IUser, "password">;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  create(userData: Omit<IUser, "id">): Promise<IUser>;
}
