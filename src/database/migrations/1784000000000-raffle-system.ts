import { MigrationInterface, QueryRunner } from 'typeorm';

export class RaffleSystem1784000000000 implements MigrationInterface {
  name = 'RaffleSystem1784000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "system_config" (
        "id" integer NOT NULL DEFAULT 1,
        "navbarTitle" character varying NOT NULL DEFAULT 'Sorteo JDT 2026',
        "navbarImagePath" character varying,
        "adminTabName" character varying NOT NULL DEFAULT 'Panel de Administración',
        "adminFaviconPath" character varying,
        "publicTabName" character varying NOT NULL DEFAULT 'Sorteo en vivo',
        "publicFaviconPath" character varying,
        "defaultGroupPrefix" character varying NOT NULL DEFAULT 'Grupo',
        "publicTitle" character varying,
        "publicImagePath" character varying,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_system_config" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`INSERT INTO "system_config" ("id") VALUES (1)`);

    await queryRunner.query(`
      CREATE TABLE "default_categories" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "order" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_default_categories_name" UNIQUE ("name"),
        CONSTRAINT "PK_default_categories" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      INSERT INTO "default_categories" ("name", "order") VALUES ('Masculino', 0), ('Femenino', 1)
    `);

    await queryRunner.query(`
      CREATE TABLE "global_teams" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "abbreviation" character varying NOT NULL,
        "imagePath" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_global_teams" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "raffles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "status" character varying NOT NULL DEFAULT 'pending',
        "publicSlug" character varying,
        "drawSlug" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_raffles_publicSlug" UNIQUE ("publicSlug"),
        CONSTRAINT "UQ_raffles_drawSlug" UNIQUE ("drawSlug"),
        CONSTRAINT "PK_raffles" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "raffle_teams" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "raffleId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "abbreviation" character varying NOT NULL,
        "imagePath" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_raffle_teams" PRIMARY KEY ("id"),
        CONSTRAINT "FK_raffle_teams_raffleId" FOREIGN KEY ("raffleId")
          REFERENCES "raffles"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "sports" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "raffleId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "abbreviation" character varying NOT NULL,
        "order" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sports" PRIMARY KEY ("id"),
        CONSTRAINT "FK_sports_raffleId" FOREIGN KEY ("raffleId")
          REFERENCES "raffles"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "sport_categories" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sportId" uuid NOT NULL,
        "name" character varying NOT NULL,
        "order" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sport_categories" PRIMARY KEY ("id"),
        CONSTRAINT "FK_sport_categories_sportId" FOREIGN KEY ("sportId")
          REFERENCES "sports"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "sport_category_groups" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sportId" uuid NOT NULL,
        "sportCategoryId" uuid,
        "name" character varying NOT NULL,
        "capacity" integer NOT NULL DEFAULT 4,
        "sortOrder" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sport_category_groups" PRIMARY KEY ("id"),
        CONSTRAINT "FK_scg_sportId" FOREIGN KEY ("sportId")
          REFERENCES "sports"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_scg_sportCategoryId" FOREIGN KEY ("sportCategoryId")
          REFERENCES "sport_categories"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "sport_category_teams" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "sportId" uuid NOT NULL,
        "sportCategoryId" uuid,
        "raffleTeamId" uuid NOT NULL,
        CONSTRAINT "PK_sport_category_teams" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_sct_sport_cat_team" UNIQUE ("sportId", "sportCategoryId", "raffleTeamId"),
        CONSTRAINT "FK_sct_sportId" FOREIGN KEY ("sportId")
          REFERENCES "sports"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_sct_sportCategoryId" FOREIGN KEY ("sportCategoryId")
          REFERENCES "sport_categories"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_sct_raffleTeamId" FOREIGN KEY ("raffleTeamId")
          REFERENCES "raffle_teams"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "draw_results" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "raffleId" uuid NOT NULL,
        "sportCategoryGroupId" uuid NOT NULL,
        "raffleTeamId" uuid NOT NULL,
        "position" integer NOT NULL,
        "drawnAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_draw_results" PRIMARY KEY ("id"),
        CONSTRAINT "FK_dr_raffleId" FOREIGN KEY ("raffleId")
          REFERENCES "raffles"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_dr_sportCategoryGroupId" FOREIGN KEY ("sportCategoryGroupId")
          REFERENCES "sport_category_groups"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_dr_raffleTeamId" FOREIGN KEY ("raffleTeamId")
          REFERENCES "raffle_teams"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "draw_states" (
        "raffleId" uuid NOT NULL,
        "currentSportId" uuid,
        "currentSportCategoryId" uuid,
        "drawnTeamId" uuid,
        "phase" character varying NOT NULL DEFAULT 'idle',
        "lastDrawResultId" uuid,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_draw_states" PRIMARY KEY ("raffleId"),
        CONSTRAINT "FK_ds_raffleId" FOREIGN KEY ("raffleId")
          REFERENCES "raffles"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_ds_currentSportId" FOREIGN KEY ("currentSportId")
          REFERENCES "sports"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_ds_currentSportCategoryId" FOREIGN KEY ("currentSportCategoryId")
          REFERENCES "sport_categories"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_ds_drawnTeamId" FOREIGN KEY ("drawnTeamId")
          REFERENCES "raffle_teams"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_ds_lastDrawResultId" FOREIGN KEY ("lastDrawResultId")
          REFERENCES "draw_results"("id") ON DELETE SET NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "draw_states"`);
    await queryRunner.query(`DROP TABLE "draw_results"`);
    await queryRunner.query(`DROP TABLE "sport_category_teams"`);
    await queryRunner.query(`DROP TABLE "sport_category_groups"`);
    await queryRunner.query(`DROP TABLE "sport_categories"`);
    await queryRunner.query(`DROP TABLE "sports"`);
    await queryRunner.query(`DROP TABLE "raffle_teams"`);
    await queryRunner.query(`DROP TABLE "raffles"`);
    await queryRunner.query(`DROP TABLE "global_teams"`);
    await queryRunner.query(`DROP TABLE "default_categories"`);
    await queryRunner.query(`DROP TABLE "system_config"`);
  }
}