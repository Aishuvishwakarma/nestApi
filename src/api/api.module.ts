import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SkillsModule } from './skills/skills.module';
import { EmploymentsModule } from './employments/employments.module';
import { EducationsModule } from './educations/educations.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    RolesModule,
    AuthModule,
    UsersModule,
    SkillsModule,
    EmploymentsModule,
    EducationsModule,
    ResumeModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
