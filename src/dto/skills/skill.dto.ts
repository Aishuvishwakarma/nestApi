import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class SkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'deactive'])
  status: string = 'active';
}

export class UserSkillDto {
  @IsString()
  @IsNotEmpty()
  skillId: string;
}
