import { Module } from '@nestjs/common';
import { DetectorModule } from './detector/detector.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DetectorModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    PhotosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
