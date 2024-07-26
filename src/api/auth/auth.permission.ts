import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../interfaces/user.interface'; // Adjust the path as needed

@Injectable()
export class AuthPermission implements NestMiddleware {
  static create(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user: IUser | any = req.user;
        if (user && user.role.name === role) {
          return next();
        } else {
          return res.status(403).json({
            message: 'User does not have permission',
            status: 'error',
          });
        }
      } catch (error) {
        return res.status(500).json({
          message: 'Internal server error',
          status: 'error',
        });
      }
    };
  }

  use(req: Request, res: Response, next: NextFunction) {
    // This method is not used but required by the interface
  }
}
