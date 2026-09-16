import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportEntity } from './sport.entity.js';
import { SportCategoryEntity } from './sport-category.entity.js';
import { RaffleTeamEntity } from '../../raffle-team/entities/raffle-team.entity.js';

@Entity('sport_category_teams')
export class SportCategoryTeamEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') sportId!: string;
  @ManyToOne(() => SportEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sportId' }) sport!: SportEntity;
  @Column({ type: 'uuid', nullable: true }) sportCategoryId!: string | null;
  @ManyToOne(() => SportCategoryEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'sportCategoryId' }) sportCategory!: SportCategoryEntity | null;
  @Column('uuid') raffleTeamId!: string;
  @ManyToOne(() => RaffleTeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raffleTeamId' }) raffleTeam!: RaffleTeamEntity;
}