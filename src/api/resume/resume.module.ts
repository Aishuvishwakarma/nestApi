import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { UserSkill, UserSkillSchema } from '../../schemas/user.skill.schema';
import {
  UserEducation,
  UserEducationSchema,
} from '../../schemas/user.education.schema';
import {
  UserEmployment,
  UserEmploymentSchema,
} from '../../schemas/user.employment.schema';
import { UserInfo, UserInfoSchema } from '../../schemas/user.info.schema';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSkill.name, schema: UserSkillSchema }]),
    MongooseModule.forFeature([{name:UserEducation.name,schema:UserEducationSchema}]),
    MongooseModule.forFeature([{name:UserEmployment.name,schema:UserEmploymentSchema}]),
    MongooseModule.forFeature([{name:UserInfo.name, schema: UserInfoSchema}]),
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
