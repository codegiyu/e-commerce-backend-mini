const ACCESS_TOKEN_EXPIRY = 1000 * 60 * 15; // 15 minutes in milliseconds;
const REFRESH_TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 30; // 30 days in milliseconds;

export const TOKENS_EXPIRY = {
  ACCESS: ACCESS_TOKEN_EXPIRY,
  REFRESH: REFRESH_TOKEN_EXPIRY,
};
