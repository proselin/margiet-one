import { connectionFactory } from './margiet-minio.connection.providers';
import { InjectMinio } from './margiet-minio.decorator';
import { MargietMinioModule } from './margiet-minio.module';
import { ConfigurableModuleClass } from './margiet-minio.module-definition';
import { MargietMinioOptions } from './margiet-minio.options';
import { MargietMinioService } from './margiet-minio.service';

export {
    connectionFactory,
    InjectMinio,
    ConfigurableModuleClass,
    MargietMinioModule,
    MargietMinioOptions,
    MargietMinioService
}
