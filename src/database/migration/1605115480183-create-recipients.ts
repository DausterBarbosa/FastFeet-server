import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRecipients1605115480183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "recipient",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    unsigned: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "street",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "complement",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "state",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "city",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "cep",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipient");
    }

}
