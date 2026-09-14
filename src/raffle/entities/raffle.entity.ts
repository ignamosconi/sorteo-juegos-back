import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum RaffleStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

@Entity('raffles')
export class RaffleEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() name!: string;
  @Column({ default: RaffleStatus.PENDING }) status!: string;
  @Column({ nullable: true, type: 'varchar' }) publicSlug!: string | null;
  @Column({ nullable: true, type: 'varchar' }) drawSlug!: string | null;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}