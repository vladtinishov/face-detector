import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly repo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Schedule> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.repo.create(dto);
    console.log(schedule)
    return this.repo.save(schedule);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    await this.repo.update(id, updateScheduleDto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
