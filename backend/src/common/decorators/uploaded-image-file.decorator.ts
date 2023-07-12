import { FileTypeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';

const acceptableType = /image\/*/;

export function UploadedImageFile() {
  return UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: acceptableType })],
    }),
  );
}
