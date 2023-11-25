import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Organization } from './organization.entity';
import { Token } from './token.entity';

@Entity()
@Unique('email-unico', ['email']) //
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Organization, (e: Organization) => e.users)
  organization: Organization;

  @OneToMany(
    () => Token,
    (s: Token) => {
      s.user;
    }
  )
  sessions: Token[];

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
