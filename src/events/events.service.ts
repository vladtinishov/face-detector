import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.repo.create(dto);
    return this.repo.save(event);
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
