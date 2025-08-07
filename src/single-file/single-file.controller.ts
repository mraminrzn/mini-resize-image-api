import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, NotFoundException, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { fileUploadDto } from './dtos/file.dto';
import { saveFiles } from './util/saveImage';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Controller('single-file')
export class SingleFileController {


  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post()
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 5024 * 1024 // 5MB
      }),
      new FileTypeValidator({
        fileType: 'image/png',
      })
    ]
  })) file: Express.Multer.File, @Body() Body: fileUploadDto ) {
    const urlImage = await saveFiles(file, Body);
   return { url: urlImage };
  }

  @Delete()
  handleDelete(@Query('url') imageUrl: string) {
    if (!imageUrl) throw new NotFoundException('Image URL not found');
    const url = imageUrl.split('http://localhost:3000')[1]
   console.log(join(process.cwd() + url));
   
    if (!existsSync(join(process.cwd() + url))) {
        throw new NotFoundException('Image URL not found');
    }
     unlinkSync(join(process.cwd() + url));
        return { message: 'Image deleted successfully' };

  }

}
