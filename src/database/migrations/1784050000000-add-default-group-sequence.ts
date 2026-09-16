import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultGroupSequence1784050000000 implements MigrationInterface {
  name = 'AddDefaultGroupSequence1784050000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_config" ADD "defaultGroupSequence" character varying NOT NULL DEFAULT 'ALPHA_UPPER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_config" DROP COLUMN "defaultGroupSequence"`,
    );
  }
}