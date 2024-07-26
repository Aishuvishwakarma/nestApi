import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';



export type UserSkillDocument = UserSkill & Document;

@Schema({ timestamps: true })
export class UserSkill {
  @Prop({ type: MongooseSchema.ObjectId, ref: 'Skill', required: true })
  skillId: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;
}

export const UserSkillSchema = SchemaFactory.createForClass(UserSkill);

