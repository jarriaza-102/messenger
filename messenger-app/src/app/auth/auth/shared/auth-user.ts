export class AuthUser {
  constructor (
    public email?: string,
    public password?: string,
    public full_name?: string,
    public token?: string,
    public idUser?: number
  ) {}

}
