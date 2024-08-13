export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IAuth {
  userId: string;
  refreshToken: string;
}
