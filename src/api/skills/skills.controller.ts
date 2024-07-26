import {
  HttpStatus,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Res,
  Param,
  Body,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Response } from 'express';
import { SkillDto, UserSkillDto } from '../../dto/skills/skill.dto';

@Controller('/api/skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  async getAllSkills(@Res() res: Response) {
    const skills = await this.skillsService.getAllSkills();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Skills fetched successfully', skills });
  }

  @Get('/:id')
  async getSkill(@Param('id') id: string, @Res() res: Response) {
    const skill = await this.skillsService.getSkill(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Skill fetched successfully', skill });
  }

  @Post()
  async create(@Body() skillDto: SkillDto, @Res() res: Response) {
    const skill = await this.skillsService.createSkill(skillDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Skill created successfully', skill });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() skillDto: SkillDto,
    @Res() res: Response,
  ) {
    const updatedSkill = await this.skillsService.updateSkill(id, skillDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Skill updated successfully', updatedSkill });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const skill = await this.skillsService.deleteSkill(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Skill deleted successfully', skill });
  }

  @Get('/user/:userId')
  async getUserSkills(@Param('userId') userId: string, @Res() res: Response) {
    const skills = await this.skillsService.getUserSkills(userId);
    if (!skills) {
      return res
        .status(400)
        .json({ message: 'No Skills With that Id', userId });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User Skills fetched successfully', skills });
  }

  @Post('/user/:userId')
  async addUserSkills(
    @Param('userId') userId: string,
    @Body() skillDto: UserSkillDto,
    @Res() res: Response,
  ) {
    const userRole = await this.skillsService.checkRoleByUserId(userId);
    if (!userRole) {
      return res.status(400).json({ message: 'Invalid Id Provided', userId });
    }
    const userSkill = await this.skillsService.checkDuplicateSkills(
      userId,
      skillDto.skillId,
    );
    if (!userSkill) {
      return res
        .status(400)
        .json({ message: 'Skill already added', skillId: skillDto.skillId });
    }
    const skills = await this.skillsService.addUserSkills(userId, skillDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User Skills added successfully', skills });
  }

  @Delete('/user/:userId/:skillId')
  async deleteUserSkills(
    @Param('userId') userId: string,
    @Param('skillId') skillId: string,
    @Res() res: Response,
  ) {
    const skills = await this.skillsService.removeUserSkills(userId, skillId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User Skills deleted successfully', skills });
  }
}
