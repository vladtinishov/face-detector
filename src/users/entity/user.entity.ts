import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: false })
  groupId: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  login: string;

  @Column({ length: 255 })
  password: string;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;
}
