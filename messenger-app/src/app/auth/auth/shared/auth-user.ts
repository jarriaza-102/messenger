export class AuthUser {
  constructor (
    public email?: string,
    public password?: string,
    public fullName?: string,
    public token?: string,
    public idUser?: number
  ) {}

}
