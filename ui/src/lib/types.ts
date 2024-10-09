export type User = {
  email: string;
  username: string;
};

export type JWTClaims = {
  user: User;
  exp: number;
};
