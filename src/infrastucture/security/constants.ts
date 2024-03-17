export const SUPER_USER_JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET_KEY,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  expiresIn: '5m',
  refreshExpiresIn: '30d',
};

export const AUTHOR_JWT_CONSTANTS = {
  secret: process.env.AUTHOR_JWT_SECRET_KEY,
  refreshSecret: process.env.AUTHO_JWT_REFRESH_SECRET,
  expiresIn: '5m',
  refreshExpiresIn: '30d',
};

export interface IUserTokenPayload {
  sub: string;
  iat: number;
  expiresIn: number;
}
