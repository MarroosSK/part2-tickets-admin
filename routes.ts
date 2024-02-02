/**
 * public routes, that don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * auth routes
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * never block this api route in middleware
 * @type {string}
 */
export const apiRoutePrefix = "/api/auth";

/**
 * user will get redirected to this /settings page after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
