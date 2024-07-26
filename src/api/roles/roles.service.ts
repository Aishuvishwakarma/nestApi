import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../../schemas/role.schema';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async onModuleInit() {
    const roles = ['admin', 'company', 'companyHr', 'college', 'student'];

    for (const roleName of roles) {
      const roleExists = await this.roleModel.exists({ name: roleName });
      if (!roleExists) {
        await this.roleModel.create({ name: roleName });
      }
    }
  }

  async findOneByName(name: string): Promise<Role | null> {
    return this.roleModel.findOne({ name }).exec();
  }

  async findOne(id: string): Promise<Role | null> {
    return this.roleModel.findOne({ _id: id }).exec();
  }
}
