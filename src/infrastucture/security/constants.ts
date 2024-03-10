export const SUPER_USER_JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET_KEY,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  expiresIn: '5m',
  refreshExpiresIn: '30d',
};


export interface ISuperUserTokenPayload {
    sub: string;
    iat: number;
    expiresIn: number;
}
