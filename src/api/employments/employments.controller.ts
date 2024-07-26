import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateUserEmploymentDto,
  UpdateUserEmploymentDto,
} from '../../dto/employment/user.employment.dto';
import { EmploymentsService } from './employments.service';

@Controller('/api/employments')
export class EmploymentsController {
  constructor(private employmentsService: EmploymentsService) {}

  @Get('/:userId')
  async getAllUserEmployments(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const employments =
      await this.employmentsService.getAllUserEmployments(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employments fetched successfully', employments });
  }

  @Post()
  async createUserEmployment(
    @Body() userEmploymentDto: CreateUserEmploymentDto,
    @Res() res: Response,
  ) {
    const employment =
      await this.employmentsService.createUserEmployment(userEmploymentDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment created successfully', employment });
  }

  @Put('/:userId/:employmentId')
  async updateUserEmployment(
    @Param('employmentId') employmentId: string,
    @Param('userId') userId: string,
    @Body() UpdateUserEmploymentDto: UpdateUserEmploymentDto,
    @Res() res: Response,
  ) {
    const employment = await this.employmentsService.updateUserEmployment(
      employmentId,
      userId,
      UpdateUserEmploymentDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment updated successfully', employment });
  }

  @Delete('/:userId/:employmentId')
  async deleteUserEmployment(@Param('employmentId') employmentId: string, @Res() res: Response) {
    const employment = await this.employmentsService.deleteUserEmployment(employmentId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User employment deleted successfully', employment });
  }
}
