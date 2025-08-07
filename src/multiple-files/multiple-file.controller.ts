import { Body, Controller, NotFoundException, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { MultipleFileUploadDto } from './dtos/mutipleFile.dto';
import { saveFiles } from 'src/single-file/util/saveImage';
import { log } from 'util';

@Controller('multiple-file')
export class MultipleFileController {

    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @Post()
   async uploadMutipleFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: MultipleFileUploadDto) {
        if (files.length < 1) throw new NotFoundException('not image files')
   const ImagesUrl: string[] = [];
        
        for (const file of files) {
            const imageUrl = await saveFiles(file, body);
            ImagesUrl.push(imageUrl);
        }

        return ImagesUrl;
    }
}
