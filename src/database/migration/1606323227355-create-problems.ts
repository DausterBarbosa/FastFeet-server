import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createProblems1606323227355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "problem",
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
                    name: "description",
                    isNullable: false,
                    type: "varchar"
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

        await queryRunner.addColumn("problem", new TableColumn({
            name: "delivery_id",
            type: "int",
            isNullable: false,
        }));

        await queryRunner.createForeignKey("problem", new TableForeignKey({
            columnNames: ["delivery_id"],
            referencedTableName: "order",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("problem");
    }

}
