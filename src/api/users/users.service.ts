import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UpdateUserDto, UpdateUserInfoDto } from '../../dto/users/user.dto';
import { UserInfo, UserInfoDocument } from '../../schemas/user.info.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>,
  ) {}

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserInfo(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('userInfo').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUserInfo(
    userId: string,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<UserInfo> {
    const user: any = await this.userModel
      .findById(userId)
      .populate('userInfo')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.userInfo) {
      user.userInfo = await this.userInfoModel.create({
        userId,
        ...updateUserInfoDto,
      });
    } else {
      user.userInfo = await this.userInfoModel.findByIdAndUpdate(
        user.userInfo._id,
        updateUserInfoDto,
        {
          new: true,
        },
      );
    }

    await user.save();

    return user.userInfo;
  }
}
