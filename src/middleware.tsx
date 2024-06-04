import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Match all routes except static files and _next directory
    '/',                      // Explicitly match the homepages
    '/(api|trpc)(.*)',        // Match API and trpc routes
    "/api/webhook",
  ],
};
