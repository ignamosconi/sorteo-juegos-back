import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultSportsAndRemoveSportAbbreviation1784200000000 implements MigrationInterface {
  name = 'AddDefaultSportsAndRemoveSportAbbreviation1784200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sports" DROP COLUMN "abbreviation"`);
    await queryRunner.query(
      `CREATE TABLE "default_sports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_default_sports_name" UNIQUE ("name"), CONSTRAINT "PK_default_sports_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "default_sports"`);
    await queryRunner.query(
      `ALTER TABLE "sports" ADD "abbreviation" character varying NOT NULL DEFAULT ''`,
    );
  }
}