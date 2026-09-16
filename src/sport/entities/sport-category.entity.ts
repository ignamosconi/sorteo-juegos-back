import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportEntity } from './sport.entity.js';

@Entity('sport_categories')
export class SportCategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') sportId!: string;
  @ManyToOne(() => SportEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sportId' }) sport!: SportEntity;
  @Column() name!: string;
  @Column({ default: 0 }) order!: number;
  @CreateDateColumn() createdAt!: Date;
}