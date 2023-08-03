import { FileTypeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';

const acceptableType = /image\/*/;

export function UploadedImageFile(options?: { fileIsRequired: boolean }) {
  return UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: acceptableType })],
      fileIsRequired: options ? options.fileIsRequired : true,
    }),
  );
}
