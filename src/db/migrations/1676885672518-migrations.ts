import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1676885672518 implements MigrationInterface {
    name = 'migrations1676885672518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_540a00bd092404355e461ece1c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_50c85272913bb9a20198e25616e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_402c872b4d95f3710804d162a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Favotites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_49464e67dc3cbee2446dbbc27cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" integer NOT NULL DEFAULT '1676885672', "updatedAt" integer NOT NULL DEFAULT '1676885672', "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favotites_artists_artists" ("favotitesId" uuid NOT NULL, "artistsId" uuid NOT NULL, CONSTRAINT "PK_214031111f830d78628242889b0" PRIMARY KEY ("favotitesId", "artistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9360ef2de999afbb5e0e842930" ON "favotites_artists_artists" ("favotitesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9243b8d48339130a2a39918a63" ON "favotites_artists_artists" ("artistsId") `);
        await queryRunner.query(`CREATE TABLE "favotites_albums_albums" ("favotitesId" uuid NOT NULL, "albumsId" uuid NOT NULL, CONSTRAINT "PK_e5282f2a61605724195444b4341" PRIMARY KEY ("favotitesId", "albumsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1390c72c1ee46ba92d74feb1cd" ON "favotites_albums_albums" ("favotitesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2a2fe95c433d7716c2ca96997" ON "favotites_albums_albums" ("albumsId") `);
        await queryRunner.query(`CREATE TABLE "favotites_tracks_tracks" ("favotitesId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_baebc6104f292b4d8b6325341e8" PRIMARY KEY ("favotitesId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_677402b118fbf1dfa8aa108921" ON "favotites_tracks_tracks" ("favotitesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf97349e24d5d00fa2f53f6005" ON "favotites_tracks_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "Tracks" ADD CONSTRAINT "FK_b65b20cf5f9b423399e380992cf" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Tracks" ADD CONSTRAINT "FK_38e6b237172e4f7ba3160545e81" FOREIGN KEY ("albumId") REFERENCES "Albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Albums" ADD CONSTRAINT "FK_8db4885faf0a0bebd8f6deb372e" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favotites_artists_artists" ADD CONSTRAINT "FK_9360ef2de999afbb5e0e8429301" FOREIGN KEY ("favotitesId") REFERENCES "Favotites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favotites_artists_artists" ADD CONSTRAINT "FK_9243b8d48339130a2a39918a639" FOREIGN KEY ("artistsId") REFERENCES "Artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favotites_albums_albums" ADD CONSTRAINT "FK_1390c72c1ee46ba92d74feb1cd3" FOREIGN KEY ("favotitesId") REFERENCES "Favotites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favotites_albums_albums" ADD CONSTRAINT "FK_c2a2fe95c433d7716c2ca96997d" FOREIGN KEY ("albumsId") REFERENCES "Albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favotites_tracks_tracks" ADD CONSTRAINT "FK_677402b118fbf1dfa8aa108921b" FOREIGN KEY ("favotitesId") REFERENCES "Favotites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favotites_tracks_tracks" ADD CONSTRAINT "FK_bf97349e24d5d00fa2f53f6005c" FOREIGN KEY ("tracksId") REFERENCES "Tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favotites_tracks_tracks" DROP CONSTRAINT "FK_bf97349e24d5d00fa2f53f6005c"`);
        await queryRunner.query(`ALTER TABLE "favotites_tracks_tracks" DROP CONSTRAINT "FK_677402b118fbf1dfa8aa108921b"`);
        await queryRunner.query(`ALTER TABLE "favotites_albums_albums" DROP CONSTRAINT "FK_c2a2fe95c433d7716c2ca96997d"`);
        await queryRunner.query(`ALTER TABLE "favotites_albums_albums" DROP CONSTRAINT "FK_1390c72c1ee46ba92d74feb1cd3"`);
        await queryRunner.query(`ALTER TABLE "favotites_artists_artists" DROP CONSTRAINT "FK_9243b8d48339130a2a39918a639"`);
        await queryRunner.query(`ALTER TABLE "favotites_artists_artists" DROP CONSTRAINT "FK_9360ef2de999afbb5e0e8429301"`);
        await queryRunner.query(`ALTER TABLE "Albums" DROP CONSTRAINT "FK_8db4885faf0a0bebd8f6deb372e"`);
        await queryRunner.query(`ALTER TABLE "Tracks" DROP CONSTRAINT "FK_38e6b237172e4f7ba3160545e81"`);
        await queryRunner.query(`ALTER TABLE "Tracks" DROP CONSTRAINT "FK_b65b20cf5f9b423399e380992cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf97349e24d5d00fa2f53f6005"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_677402b118fbf1dfa8aa108921"`);
        await queryRunner.query(`DROP TABLE "favotites_tracks_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2a2fe95c433d7716c2ca96997"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1390c72c1ee46ba92d74feb1cd"`);
        await queryRunner.query(`DROP TABLE "favotites_albums_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9243b8d48339130a2a39918a63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9360ef2de999afbb5e0e842930"`);
        await queryRunner.query(`DROP TABLE "favotites_artists_artists"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Favotites"`);
        await queryRunner.query(`DROP TABLE "Albums"`);
        await queryRunner.query(`DROP TABLE "Artists"`);
        await queryRunner.query(`DROP TABLE "Tracks"`);
    }

}
