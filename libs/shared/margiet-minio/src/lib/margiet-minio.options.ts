import { ClientOptions } from 'minio';

export type MargietMinioOptions = ClientOptions & {
  retries?: number;
  retryDelay?: number;
};
