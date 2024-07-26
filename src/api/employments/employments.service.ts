import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserEmployment,
  UserEmploymentDocument,
} from '../../schemas/user.employment.schema';
import {
  CreateUserEmploymentDto,
  UpdateUserEmploymentDto,
} from '../../dto/employment/user.employment.dto';

@Injectable()
export class EmploymentsService {
  constructor(
    @InjectModel(UserEmployment.name)
    private userEmploymentModel: Model<UserEmploymentDocument>,
  ) {}

  async getAllUserEmployments(userId: string): Promise<UserEmployment[]> {
    return this.userEmploymentModel.find({ userId }).exec();
  }

  async createUserEmployment(
    userEmploymentDto: CreateUserEmploymentDto,
  ): Promise<UserEmployment> {
    return this.userEmploymentModel.create(userEmploymentDto);
  }

  async updateUserEmployment(
    employmentId: string,
    userId: string,
    userEmploymentDto: UpdateUserEmploymentDto,
  ): Promise<UserEmployment | null> {
    return this.userEmploymentModel
      .findOneAndUpdate({ _id: employmentId, userId: userId }, userEmploymentDto, {
        new: true,
      })
      .exec();
  }

  async deleteUserEmployment(employmentId: string): Promise<UserEmployment | null> {
    return this.userEmploymentModel.findByIdAndDelete(employmentId).exec();
  }
}
