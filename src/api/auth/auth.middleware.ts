import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { IUser } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({
          message: 'User is not logged in',
          status: 'error',
        });
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      const user: IUser | any = await this.usersService.findByEmail(
        decoded.email,
      );
      const userRole = await this.rolesService.findOne(user.role);

      if (!user) {
        return res.status(403).json({
          message: 'Invalid token',
          status: 'error',
        });
      }

      req.user = { ...user.toObject(), role: userRole };
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(403).json({
          message: 'Token has expired',
          status: 'error',
        });
      }
      return res.status(403).json({
        message: 'User is not logged in',
        status: 'error',
      });
    }
  }
}
