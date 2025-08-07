import sharp from "sharp";
import {mkdirp}  from 'mkdirp'
import { fileUploadDto } from "../dtos/file.dto";

export async function saveFiles(file: Express.Multer.File, fileUploadProperty: fileUploadDto) {
  const { folder = '', width, heigh, imageType } = fileUploadProperty;

  let originalname = file.originalname;
  
  if (imageType) {
    const ext = originalname.split('.');
    originalname = originalname.replace(`.${ext[ext.length - 1]}`, `.${imageType}`);
  }
  if (folder) {
    console.log('create folder');
        await mkdirp(`files/${folder}`);

  }

  // Use sharp to process the image
  const image = sharp(file.buffer);

  // Resize the image if width and height are provided
  if (width && heigh) {
    image.resize(width, heigh);
  }

  // Set the output format based on the imageType
  if (imageType) {
    image.toFormat(imageType);
  }

  // Save the processed image
  await image.toFile(`files/${folder}/${new Date().getTime()}-${originalname}`);

  return `http://localhost:3000/files/${folder ?? `${folder}/`}${new Date().getTime()}-${originalname}`
}