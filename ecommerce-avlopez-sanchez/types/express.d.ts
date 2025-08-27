import { OpenidRequest } from 'auth0';

declare module 'express' {
  interface Request {
    oidc?: OpenidRequest & {
      isAuthenticated(): boolean;
      user: any; // O usa una interfaz específica
    };
  }
}
