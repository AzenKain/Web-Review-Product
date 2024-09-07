import { Controller, Get, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('*')
  async getImage(@Param() params: { '*': string }, @Res() res: Response) {
    const filePath = join(process.cwd(),  params['0']);
    try {
      return res.sendFile(filePath);
    } catch (error) {
      console.error('Error sending file:', error);
      throw new NotFoundException('File not found');
    }
  }
}
