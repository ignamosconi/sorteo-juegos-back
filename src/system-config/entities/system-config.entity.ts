import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_config')
export class SystemConfigEntity {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column({ default: 'Sorteo JDT 2026' })
  navbarTitle!: string;

  @Column({ nullable: true, type: 'varchar' })
  navbarImagePath!: string | null;

  @Column({ default: 'Panel de Administración' })
  adminTabName!: string;

  @Column({ nullable: true, type: 'varchar' })
  adminFaviconPath!: string | null;

  @Column({ default: 'Sorteo en vivo' })
  publicTabName!: string;

  @Column({ nullable: true, type: 'varchar' })
  publicFaviconPath!: string | null;

  @Column({ default: 'Grupo' })
  defaultGroupPrefix!: string;

  @Column({ type: 'varchar', default: 'ALPHA_UPPER' })
  defaultGroupSequence!: string;

  @Column({ nullable: true, type: 'varchar' })
  publicTitle!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  publicImagePath!: string | null;

  @UpdateDateColumn()
  updatedAt!: Date;
}