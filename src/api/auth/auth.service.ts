import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto } from '../../dto/users/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../../enums/role.enum';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  _id?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async register(
    userDto: CreateUserDto,
    req: Request,
    res: Response,
  ): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const role: any = await this.rolesService.findOneByName(userDto.role);
      if (!role) {
        return res.status(400).json({
          message: `Role '${userDto.role}' not found`,
          status: 'error',
        });
      }

      if (role.name === Role.Admin) {
        return res
          .status(400)
          .json({ message: `Permission denied`, status: 'error' });
      }

      const existingUser = await this.usersService.findByEmail(userDto.email);

      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'Email already exists', status: 'error' });
      }

      const user = await this.usersService.create({
        ...userDto,
        password: hashedPassword,
        role: role._id,
      });
      return res
        .status(201)
        .json({ message: 'User created successfully', user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', status: 'error' });
    }
  }

  async validateUser(userDto: LoginDto): Promise<any> {
    const user: any = await this.usersService.findByEmail(userDto.email);
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: IUser, req: Request, res: Response) {
    try {
      const payload = { email: user.email, sub: user._id };
      const access_token = this.jwtService.sign(payload);
      req.user = payload;
      return res.status(201).json({
        message: 'User LoggedIn successfully',
        data: {
          access_token,
          user,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', status: 'error' });
    }
  }

  getAuthRoot(): string {
    return 'Auth Root';
  }
}
