import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { imageType } from "src/single-file/dtos/file.dto";




export class MultipleFileUploadDto {
  @ApiProperty({
    type: 'array',
    description: 'The file to upload',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @IsOptional()
  files?: any[];

@ApiProperty({
  type: 'string',
  description: 'The folder to upload the file to',
  required: false,
})
  @IsString()
  @IsOptional()
  folder?: string;

  @ApiProperty({
    type: 'number',
    description: 'The width to resize the image to',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiProperty({
    type: 'number',
    description: 'The heigh to resize the image to',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  heigh?: number;

  @ApiProperty({
    enum: imageType,
    description: 'The type of image to upload',
    required: false,
  })
  @IsEnum(imageType)
  @IsOptional()
  imageType?: imageType;

}