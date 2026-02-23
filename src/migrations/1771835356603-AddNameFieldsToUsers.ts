import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameFieldsToUsers1771835356603 implements MigrationInterface {
    name = 'AddNameFieldsToUsers1771835356603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mobile\` \`mobile\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mobile\` \`mobile\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
