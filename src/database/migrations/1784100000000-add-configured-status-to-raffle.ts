import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConfiguredStatusToRaffle1784100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'raffles_status_enum') THEN
          ALTER TYPE "raffles_status_enum" ADD VALUE IF NOT EXISTS 'configured';
        ELSIF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'raffle_status_enum') THEN
          ALTER TYPE "raffle_status_enum" ADD VALUE IF NOT EXISTS 'configured';
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL no permite eliminar valores de un enum existente sin reconstruir el tipo.
  }
}