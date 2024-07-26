import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesModule } from '../roles/roles.module';
import { AuthMiddleware } from './auth.middleware';
import { AuthPermission } from './auth.permission';
import { Role } from '../../enums/role.enum';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: 'xgyjwmkzwklgdywmzjsoismqskjxxjww',
      signOptions: { expiresIn: 1 * 60 * 60 * 24 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/users', method: RequestMethod.ALL },
        { path: '/api/users/:id', method: RequestMethod.ALL },
        { path: '/api/users/info/:id', method: RequestMethod.ALL },
        { path: '/api/skills', method: RequestMethod.POST },
        { path: '/api/skills/:id', method: RequestMethod.ALL },
        { path: '/api/skills/user/:userId', method: RequestMethod.ALL },
        {
          path: '/api/skills/user/:userId/:skillId',
          method: RequestMethod.ALL,
        },
        { path: '/api/educations', method: RequestMethod.POST },
        { path: '/api/educations/:userId', method: RequestMethod.GET },
        {
          path: '/api/educations/:userId/:educationId',
          method: RequestMethod.ALL,
        },
        { path: '/api/employments', method: RequestMethod.POST },
        { path: '/api/employments/:userId', method: RequestMethod.GET },
        {
          path: '/api/employments/:userId/:employmentId',
          method: RequestMethod.ALL,
        },
        { path: '/api/resume/:userId/', method: RequestMethod.ALL },
      )
      .apply(AuthPermission.create(Role.Admin))
      .forRoutes(
        { path: '/api/users', method: RequestMethod.ALL },
        { path: '/api/skills', method: RequestMethod.POST },
        { path: '/api/skills/:id', method: RequestMethod.DELETE },
        { path: '/api/skills/:id', method: RequestMethod.PUT },
      )
      .apply(AuthPermission.create(Role.Student))
      .forRoutes(
        { path: '/api/users/:id', method: RequestMethod.ALL },
        { path: '/api/skills/user/:userId', method: RequestMethod.ALL },
        {
          path: '/api/skills/user/:userId/:skillId',
          method: RequestMethod.ALL,
        },
        { path: '/api/educations', method: RequestMethod.POST },
        {
          path: '/api/educations/:userId/:educationId',
          method: RequestMethod.ALL,
        },
        { path: '/api/employments', method: RequestMethod.POST },
        {
          path: '/api/employments/:userId/:employmentId',
          method: RequestMethod.ALL,
        },
        { path: '/api/resume/:userId/', method: RequestMethod.ALL },
      );
  }
}
