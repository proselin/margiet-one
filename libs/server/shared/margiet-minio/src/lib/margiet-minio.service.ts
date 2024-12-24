import { Inject, Injectable, Logger } from '@nestjs/common';
import * as minio from 'minio';
import { from, lastValueFrom, retry } from 'rxjs';
import { MODULE_OPTIONS_TOKEN } from './margiet-minio.module-definition';
import { MargietMinioOptions } from './margiet-minio.options';

interface INestMinioService {
  getMinio(): minio.Client;
}

@Injectable()
export class MargietMinioService implements INestMinioService {
  private _minioConnection?: minio.Client;

  private readonly logger = new Logger(MargietMinioService.name);

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private nestMinioOptions: MargietMinioOptions
  ) {}

  getMinio(): minio.Client {
    if (!this._minioConnection) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { retries, ...options } = this.nestMinioOptions;
      this._minioConnection = new minio.Client(options);
    }
    return this._minioConnection;
  }

  checkConnection() {
    const { retries = 5, retryDelay = 1000 } = this.nestMinioOptions;
    if (!this._minioConnection) return;
    lastValueFrom(
      from(this._minioConnection.listBuckets()).pipe(
        retry({ count: retries, delay: retryDelay })
      )
    )
      .then(() => {
        this.logger.log('Successfully connected to minio.');
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }
}
