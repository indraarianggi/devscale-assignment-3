export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IAuth {
  userId: string;
  refreshToken: string;
}

export interface ITodo {
  title: string;
  content: string;
  completed: boolean;
  userId: string;
}

export interface ICustomError {
  statusCode: number;
  message: string;
}
