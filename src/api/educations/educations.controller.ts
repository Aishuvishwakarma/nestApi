import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  CreateUserEducationDto,
  updateUserEducationDto,
} from '../../dto/education/user.education.dto';
import { EducationsService } from './educations.service';

@Controller('/api/educations')
export class EducationsController {
  constructor(private educationsService: EducationsService) {}

  @Get('/:userId')
  async getAllUserEducations(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const educations =
      await this.educationsService.getAllUserEducations(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User educations fetched successfully', educations });
  }

  @Post()
  async createUserEducation(
    @Body() userEducationDto: CreateUserEducationDto,
    @Res() res: Response,
    @Req() req: Request & { user: { _id: string } },
  ) {
    const userId: string = req.user._id.toString();
    if (userId !== req.body.userId) {
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Invalid User Id Provided' });
    }
    const education = await this.educationsService.createUserEducation({
      ...userEducationDto,
      userId,
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education created successfully', education });
  }

  @Put('/:userId/:educationId')
  async updateUserEducation(
    @Param('educationId') id: string,
    @Param('userId') userId: string,
    @Body() userUpdateEducationDto: updateUserEducationDto,
    @Res() res: Response,
  ) {
    const education = await this.educationsService.updateUserEducation(
      id,
      userId,
      userUpdateEducationDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education updated successfully', education });
  }

  @Delete('/:userId/:educationId')
  async deleteUserEducation(@Param('educationId') educationId: string, @Res() res: Response) {
    const education = await this.educationsService.deleteUserEducation(educationId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User education deleted successfully', education });
  }
}
