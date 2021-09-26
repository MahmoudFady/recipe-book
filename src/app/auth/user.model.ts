export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    public _tokenExpiratonDate: Date
  ) {}
  get token() {
    if (!this._tokenExpiratonDate || new Date() > this._tokenExpiratonDate) {
      return null;
    }
    return this._token;
  }
}
