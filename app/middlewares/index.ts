// Create middleware to validate incoming requests
// Create middleware to read access and refresh tokens from incoming requests and either...
// 1. Pass the request on if both are valid and not due to expire anytime soon.
// 2. If access in invalid but refresh still is, then create new access token and pass the request on
// 3. If both are valid but any is close to expiry, then create a new token and pass the request on
// 4. If refresh is invalid or both are invalid, that request should fail with a 401 Unauthenticated error.

// Create any other middlewares you see fit to