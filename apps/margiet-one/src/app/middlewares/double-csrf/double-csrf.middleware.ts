import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { doubleCsrfUtilities } from '../../config/double-csrf.config';

// Double CSRF configuration
const { doubleCsrfProtection, generateToken, validateRequest } =
  doubleCsrfUtilities;
@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // Skip CSRF for specific paths like /graphql
    const excludedPaths = ['/graphql'];
    if (excludedPaths.some((path) => req.path.startsWith(path))) {
      console.log(`CSRF bypassed for path: ${req.path}`);
      return next();
    }

    // Apply CSRF protection
    doubleCsrfProtection(req, res, next);
  }
}
