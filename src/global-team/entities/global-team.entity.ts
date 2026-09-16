import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('global_teams')
export class GlobalTeamEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() name!: string;
  @Column() abbreviation!: string;
  @Column({ nullable: true, type: 'varchar' }) imagePath!: string | null;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}