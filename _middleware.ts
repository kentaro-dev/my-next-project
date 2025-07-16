/*

Bacic認証の設定


*/

import { createNextAuthMiddleware } from 'nextjs-basic-auth-middleware';

export const middleware = createNextAuthMiddleware();

export const config = {
  matcher: ['/(.*)'],
};
