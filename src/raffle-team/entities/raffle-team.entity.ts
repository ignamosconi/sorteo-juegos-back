import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';

@Entity('raffle_teams')
export class RaffleTeamEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') raffleId!: string;
  @ManyToOne(() => RaffleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raffleId' }) raffle!: RaffleEntity;
  @Column() name!: string;
  @Column() abbreviation!: string;
  @Column({ nullable: true, type: 'varchar' }) imagePath!: string | null;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}