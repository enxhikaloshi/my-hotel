
import createMiddleware from 'next-intl/middleware';
import {routing} from './routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: ['/', '/(de|en|it)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};