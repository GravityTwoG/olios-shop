import { MINIO_CONNECTION } from './minio.constants';
import { MinioService } from './minio.service';

export const connectionFactory = {
  provide: MINIO_CONNECTION,
  inject: [MinioService],
  useFactory: async (nestMinioService: MinioService) => {
    return nestMinioService.getMinio();
  },
};
