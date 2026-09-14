import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('default_categories')
export class DefaultCategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) name!: string;
  @Column({ default: 0 }) order!: number;
  @CreateDateColumn() createdAt!: Date;
}