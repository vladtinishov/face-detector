import { Column, Entity, ManyToMany, OneToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];

  @ManyToMany(() => Group, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  groups: Group[];
}
