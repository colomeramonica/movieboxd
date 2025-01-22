import jwt from 'jsonwebtoken';

export const verifyAccessToken = (token: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';
  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};