import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportEntity } from './sport.entity.js';
import { SportCategoryEntity } from './sport-category.entity.js';

@Entity('sport_category_groups')
export class SportCategoryGroupEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') sportId!: string;
  @ManyToOne(() => SportEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sportId' }) sport!: SportEntity;
  @Column({ type: 'uuid', nullable: true }) sportCategoryId!: string | null;
  @ManyToOne(() => SportCategoryEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'sportCategoryId' }) sportCategory!: SportCategoryEntity | null;
  @Column() name!: string;
  @Column({ default: 4 }) capacity!: number;
  @Column({ default: 0 }) sortOrder!: number;
  @CreateDateColumn() createdAt!: Date;
}