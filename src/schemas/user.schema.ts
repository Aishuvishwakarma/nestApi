import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from './role.schema';
import { UserInfo } from './user.info.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: 'https://via.placeholder.com/150' })
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserInfo' })
  userInfo: UserInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });
