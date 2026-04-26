export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
