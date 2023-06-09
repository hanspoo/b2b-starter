import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Usuario } from './usuario.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  identLegal?: string;

  @OneToMany(() => Usuario, (u) => u.empresa, { cascade: true })
  usuarios: Usuario[];
}
