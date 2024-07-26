import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmploymentsController } from './employments.controller';
import { EmploymentsService } from './employments.service';
import { UserEmployment, UserEmploymentSchema } from '../../schemas/user.employment.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEmployment.name, schema: UserEmploymentSchema },
    ]),
  ],
  controllers: [EmploymentsController],
  providers: [EmploymentsService],
  exports: [EmploymentsService],
})
export class EmploymentsModule {}
