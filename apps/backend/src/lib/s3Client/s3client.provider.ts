import { S3_CLIENT } from './s3client.constants';
import { S3ClientService } from './s3client.service';

export const connectionFactory = {
  provide: S3_CLIENT,
  inject: [S3ClientService],
  useFactory: (nestS3ClientService: S3ClientService) => {
    return nestS3ClientService.getClient();
  },
};
