import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: false })
  roomId: number;

  @Column({ type: 'datetime' })
  startDateTime: Date;

  @Column({ type: 'datetime' })
  endDateTime: Date;

  @ManyToOne(() => Room, (room) => room.schedules)
  room: Room;
}
