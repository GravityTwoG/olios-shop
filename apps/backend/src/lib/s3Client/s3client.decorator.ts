import { Inject } from '@nestjs/common';
import { S3_CLIENT } from './s3client.constants';

export const InjectS3Client = () => Inject(S3_CLIENT);
