import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiRoutePrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; //ak nie je logged in

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //ak sa jedna iba o API ROUTE, nerob nic
  if (isApiAuthRoute) {
    return null;
  }

  // ak som iba na authRoute return null, lebo uzivatelia mozu tento endpoinst stale navstivit
  if (isAuthRoute) {
    // ale ak su v authRoute a zaroven uz som aj prihlaseny tak nebudem ukazovat auth routes login a register,
    // cize v tomto pripade ho presmeruj na novu url, v nasom pripade /settings
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  /*
   ak nie som ani prihlaseny a ani na publicRoute, tak automaticky hod uzivatela na /login
  */

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(`/auth/login`, nextUrl));
  }

  // inak povol any other route
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
