import { Inject } from '@nestjs/common';
import { MINIO_CONNECTION } from './margiet-minio.connection.providers';

export function InjectMinio() {
  return Inject(MINIO_CONNECTION);
}
