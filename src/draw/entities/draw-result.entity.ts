import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';
import { SportCategoryGroupEntity } from '../../sport/entities/sport-category-group.entity.js';
import { RaffleTeamEntity } from '../../raffle-team/entities/raffle-team.entity.js';

@Entity('draw_results')
export class DrawResultEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') raffleId!: string;
  @ManyToOne(() => RaffleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raffleId' }) raffle!: RaffleEntity;
  @Column('uuid') sportCategoryGroupId!: string;
  @ManyToOne(() => SportCategoryGroupEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'sportCategoryGroupId' }) sportCategoryGroup!: SportCategoryGroupEntity;
  @Column('uuid') raffleTeamId!: string;
  @ManyToOne(() => RaffleTeamEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'raffleTeamId' }) raffleTeam!: RaffleTeamEntity;
  @Column({ type: 'int' }) position!: number;
  @CreateDateColumn() drawnAt!: Date;
}