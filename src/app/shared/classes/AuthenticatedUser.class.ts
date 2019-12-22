export class AuthenticatedUser {

  constructor(
    public email: string,
    public id: number,
    private _token: string,
    private _tokenExpirationDate: Date) { }


  getExpirationDuration() {
    return new Date(this._tokenExpirationDate).getTime() - new Date().getTime();
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }



}
