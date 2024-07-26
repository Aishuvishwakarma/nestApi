import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../../dto/users/user.dto';
import { Request, Response } from 'express';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe()) userDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.register(userDto, req, res);
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 'error',
      });
    }
    return this.authService.login(user, req, res);
  }

  @Get('protected')
  async getAuthRoot(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({
      message: this.authService.getAuthRoot(),
      status: 'success',
    });
  }
}
