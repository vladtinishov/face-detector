import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Schedule} from "./entities/schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule {}
