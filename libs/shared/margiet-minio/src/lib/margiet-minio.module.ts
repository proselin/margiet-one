import { Module, OnModuleInit } from '@nestjs/common';
import { MargietMinioService } from './margiet-minio.service';
import { connectionFactory } from './margiet-minio.connection.providers';
import { ConfigurableModuleClass } from './margiet-minio.module-definition';

@Module({
  providers: [MargietMinioService, connectionFactory],
  exports: [MargietMinioService, connectionFactory],
})
export class MargietMinioModule
  extends ConfigurableModuleClass
  implements OnModuleInit {
  constructor(readonly service: MargietMinioService) {
    super();
  }
  onModuleInit() {
    this.service.checkConnection();
  }
}
