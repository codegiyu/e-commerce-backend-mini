import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = 1000 * 60 * 15; // 15 minutes in milliseconds;
const REFRESH_TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds;

export const TOKENS_EXPIRY = {
  ACCESS: ACCESS_TOKEN_EXPIRY,
  REFRESH: REFRESH_TOKEN_EXPIRY,
};

// Helper function to generate access token
export const generateAccessToken = (
  id: string,
  email: string,
  firstName: string,
  lastName: string
) => {
  return jwt.sign(
    { id, email, firstName, lastName },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: TOKENS_EXPIRY.ACCESS / 1000 } // Expiry in seconds
  );
};

// Helper function to generate refresh token
export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: TOKENS_EXPIRY.REFRESH / 1000, // Expiry in seconds
  });
};
