import { createWriteStream, ReadStream } from 'fs';

const UPLOAD_DIRECTORY = './uploads';

export class FileStorage {
  static async save(stream: ReadStream, filename: string) {
    const out = createWriteStream(`${UPLOAD_DIRECTORY}/${filename}`);
    return new Promise((resolve, reject) => {
      stream.pipe(out);
      stream.on('end', (any) => resolve(any));
      stream.on('error', (err) => reject(err));
    });
  }

  static async read() {}
}
