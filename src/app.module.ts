import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SingleFileController } from './single-file/single-file.controller';
import { MultipleFileController } from './multiple-files/multiple-file.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
       rootPath: join(__dirname, '..', 'files'),
       serveRoot: '/files'
    })
  ],
  controllers: [SingleFileController, MultipleFileController],
  providers: [],
})
export class AppModule {}
