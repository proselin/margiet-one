import { HttpStatus } from '@nestjs/common';
import { doubleCsrf } from 'csrf-csrf';
import { Request } from 'express';
import { v4 } from 'uuid';

export const doubleCsrfUtilities = doubleCsrf({
  getSecret: (req: Request) => req.cookies['XSRF-TOKEN'], // A function that optionally takes the request and returns a secret
  getSessionIdentifier: () => v4(), // A function that should return the session identifier for a given request
  cookieOptions: {
    sameSite: 'lax', // Recommend you make this strict if posible
    path: '/',
    secure: true,
  },
  cookieName: 'XSRF-TOKEN', // Name of the CSRF token cookie// Set your cookie options
  errorConfig: {
    code: 'XSRF-001',
    message: 'CSRF Failure !!',
    statusCode: HttpStatus.FORBIDDEN,
  },
  size: 64, // The size of the generated tokens in bits
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => req.headers['x-csrf-token'], // A function that returns the token from the request
});
