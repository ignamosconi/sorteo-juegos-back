import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';

@Entity('sports')
export class SportEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') raffleId!: string;
  @ManyToOne(() => RaffleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raffleId' }) raffle!: RaffleEntity;
  @Column() name!: string;
  @Column() abbreviation!: string;
  @Column({ default: 0 }) order!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}