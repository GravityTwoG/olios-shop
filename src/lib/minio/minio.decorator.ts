import { Inject } from '@nestjs/common';
import { MINIO_CONNECTION } from './minio.constants';

export const InjectMinio = () => Inject(MINIO_CONNECTION);
