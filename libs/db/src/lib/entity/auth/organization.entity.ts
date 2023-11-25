import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  identLegal?: string;

  @OneToMany(() => User, (u) => u.organization, { cascade: true })
  users: User[];
}
