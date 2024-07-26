import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationsController } from './educations.controller';
import { UserEducation, UserEducationSchema } from '../../schemas/user.education.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEducation.name, schema: UserEducationSchema },
    ]),
  ],
  providers: [EducationsService],
  controllers: [EducationsController],
  exports: [EducationsService],
})
export class EducationsModule {}
