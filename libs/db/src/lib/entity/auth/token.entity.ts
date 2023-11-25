import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  static fromUser(user: User): Token {
    const t = new Token();
    t.user = user;
    return t;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.sessions, { nullable: false })
  user: User;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  actualizado: Date;
}
