import {
  FileTypeValidator,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';

const acceptableType = /image\/*/;

export function UploadedImageFiles() {
  return UploadedFiles(
    new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: acceptableType })],
    }),
  );
}
