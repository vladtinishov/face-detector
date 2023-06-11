import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: false })
  roomId?: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Room, (room) => room.events)
  @JoinColumn({ referencedColumnName: 'id' })
  room: Room;
}
