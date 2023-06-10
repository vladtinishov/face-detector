import { Module } from '@nestjs/common';
import { DetectorModule } from './detector/detector.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './photos/photos.module';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { GroupsModule } from './groups/groups.module';
import { SchedulesModule } from './schedules/schedules.module';

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
    UsersModule,
    AuthModule,
    RoomsModule,
    GroupsModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
