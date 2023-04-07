export interface ICurrentUser extends Omit<IPayload, 'sub'> {
  userId: string;
  roles: string[];

}

export interface IPayload {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}