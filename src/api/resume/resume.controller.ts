import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResumeService } from './resume.service';

@Controller('/api/resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get('/:userId')
  async generateResume(@Param('userId') userId: string, @Res() res: Response) {
    const resume = await this.resumeService.generateResume(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Resume generated successfully', resume });
  }
}
