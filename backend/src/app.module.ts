import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { typeOrmConfig } from './config/typeorm.config';
import { CameraModule } from './camera/camera.module';
import DHCPService from './dhcp';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    CameraModule,
  ],
  providers: [Logger, DHCPService],
})
export class AppModule {}
