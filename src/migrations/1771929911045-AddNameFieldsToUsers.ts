import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameFieldsToUsers1771929911045 implements MigrationInterface {
    name = 'AddNameFieldsToUsers1771929911045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`mail_verified\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mobile\` \`mobile\` varchar(255) NULL DEFAULT 'NULL'`);
      
    }

}
