export interface authenticatedUser {
  email: string;
  id: number;
  full_name?: string;
  readonly _token: string;
  readonly _tokenExpirationDate: Date;
}
