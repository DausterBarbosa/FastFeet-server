import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createOrders1605465983867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "order",
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
                    name: "product",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "canceled_at",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "start_date",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "end_date",
                    type: "timestamp",
                    isNullable: true,
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

        await queryRunner.addColumn("order", new TableColumn({
            name: "recipient_id",
            type: "int",
            isNullable: false,
        }));

        await queryRunner.createForeignKey("order", new TableForeignKey({
            columnNames: ["recipient_id"],
            referencedTableName: "recipient",
            referencedColumnNames: ["id"]
        }));

        await queryRunner.addColumn("order", new TableColumn({
            name: "deliveryman_id",
            type: "int",
            isNullable: false,
        }));

        await queryRunner.createForeignKey("order", new TableForeignKey({
            columnNames: ["deliveryman_id"],
            referencedTableName: "deliveryman",
            referencedColumnNames: ["id"]
        }));

        await queryRunner.addColumn("order", new TableColumn({
            name: "signature_id",
            type: "int",
            isNullable: true,
        }));

        await queryRunner.createForeignKey("order", new TableForeignKey({
            columnNames: ["signature_id"],
            referencedTableName: "signature",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order");
    }

}