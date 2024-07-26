import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserEducation,
  UserEducationDocument,
} from '../../schemas/user.education.schema';
import {
  CreateUserEducationDto,
  updateUserEducationDto,
} from '../../dto/education/user.education.dto';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel(UserEducation.name)
    private userEducationModel: Model<UserEducationDocument>,
  ) {}

  async getAllUserEducations(userId: string): Promise<UserEducation[]> {
    return this.userEducationModel.find({ userId }).exec();
  }

  async createUserEducation(
    userEducationDto: CreateUserEducationDto,
  ): Promise<UserEducation> {
    return this.userEducationModel.create(userEducationDto);
  }

  async updateUserEducation(
    id: string,
    userId: string,
    userUpdateEducationDto: updateUserEducationDto,
  ): Promise<UserEducation | null> {
    return this.userEducationModel
      .findOneAndUpdate({ _id: id, userId: userId }, userUpdateEducationDto, {
        new: true,
      })
      .exec();
  }

  async deleteUserEducation(id: string): Promise<UserEducation | null> {
    return this.userEducationModel.findByIdAndDelete(id).exec();
  }
}
