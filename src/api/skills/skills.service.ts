import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../../schemas/skill.schema';
import { UserSkill, UserSkillDocument } from '../../schemas/user.skill.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { SkillDto, UserSkillDto } from '../../dto/skills/skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillsModel: Model<SkillDocument>,
    @InjectModel(UserSkill.name)
    private userSkillsModel: Model<UserSkillDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.skillsModel.find().exec();
  }

  async getSkill(skillId: string): Promise<Skill | null> {
    return this.skillsModel.findById(skillId).exec();
  }

  async createSkill(skillDto: SkillDto): Promise<Skill | null> {
    return this.skillsModel.create(skillDto);
  }

  async updateSkill(id: string, skillDto: SkillDto): Promise<Skill | null> {
    return this.skillsModel
      .findByIdAndUpdate(id, skillDto, { new: true })
      .exec();
  }

  async deleteSkill(skillId: string): Promise<Skill | null> {
    return this.skillsModel.findByIdAndDelete(skillId).exec();
  }

  async getUserSkills(userId: string): Promise<UserSkill[] | null> {
    return this.userSkillsModel.find({ userId }).exec();
  }

  async checkRoleByUserId(userId: string): Promise<Boolean> {
    const user: any = await this.userModel
      .findById(userId)
      .populate('role')
      .exec();
    if (user.role.name === 'admin') {
      return false;
    } else {
      return true;
    }
  }

  async checkDuplicateSkills(
    userId: string,
    skillId: string,
  ): Promise<Boolean> {
    const userSkill = await this.userSkillsModel.findOne({
      userId,
      skillId,
    });
    if (userSkill) {
      return false;
    } else {
      return true;
    }
  }

  async addUserSkills(
    userId: string,
    skillDto: UserSkillDto,
  ): Promise<UserSkill | null> {
    return this.userSkillsModel.create({ userId, ...skillDto });
  }

  async removeUserSkills(
    userId: string,
    skillId: string,
  ): Promise<UserSkill | null> {
    return this.userSkillsModel.findOneAndDelete({
      userId,
      skillId,
    });
  }
}
