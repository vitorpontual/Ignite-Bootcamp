import { query } from "express";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserColumnEmail1616938919873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "email")
        await queryRunner.addColumn("users",
            new TableColumn({
                name: "email",
                type: "varchar",
                isNullable: true
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "email")
        await queryRunner.addColumn("users", new TableColumn({
            name: "email",
            type: "varchar",
            isUnique: true
        }))
    }

}
