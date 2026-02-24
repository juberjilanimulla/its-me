import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameFieldsToUsers1771839331436 implements MigrationInterface {
    name = 'AddNameFieldsToUsers1771839331436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`middleName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`mail_verified\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mobile\` \`mobile\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mobile\` \`mobile\` varchar(255) NULL DEFAULT ''NULL''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`mail_verified\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`middleName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    }

}
