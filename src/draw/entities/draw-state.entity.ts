import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { RaffleEntity } from '../../raffle/entities/raffle.entity.js';
import { SportEntity } from '../../sport/entities/sport.entity.js';
import { SportCategoryEntity } from '../../sport/entities/sport-category.entity.js';
import { RaffleTeamEntity } from '../../raffle-team/entities/raffle-team.entity.js';
import { DrawResultEntity } from './draw-result.entity.js';

export enum DrawPhase {
  IDLE = 'idle',
  PICKING_TEAM = 'picking_team',
  PICKING_GROUP = 'picking_group',
}

@Entity('draw_states')
export class DrawStateEntity {
  @PrimaryColumn('uuid') raffleId!: string;
  @ManyToOne(() => RaffleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raffleId' }) raffle!: RaffleEntity;
  @Column({ type: 'uuid', nullable: true }) currentSportId!: string | null;
  @ManyToOne(() => SportEntity, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'currentSportId' }) currentSport!: SportEntity | null;
  @Column({ type: 'uuid', nullable: true }) currentSportCategoryId!: string | null;
  @ManyToOne(() => SportCategoryEntity, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'currentSportCategoryId' }) currentSportCategory!: SportCategoryEntity | null;
  @Column({ type: 'uuid', nullable: true }) drawnTeamId!: string | null;
  @ManyToOne(() => RaffleTeamEntity, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'drawnTeamId' }) drawnTeam!: RaffleTeamEntity | null;
  @Column({ default: DrawPhase.IDLE }) phase!: string;
  @Column({ type: 'uuid', nullable: true }) lastDrawResultId!: string | null;
  @ManyToOne(() => DrawResultEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lastDrawResultId' }) lastDrawResult!: DrawResultEntity | null;
  @UpdateDateColumn() updatedAt!: Date;
}