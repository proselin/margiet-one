import { MargietMinioService } from './margiet-minio.service';

export const MINIO_CONNECTION = 'MINIO_CONNECTION';

export const connectionFactory = {
  provide: MINIO_CONNECTION,
  useFactory: async (nestMinioService: MargietMinioService) => {
    return nestMinioService.getMinio();
  },
  inject: [MargietMinioService],
};
