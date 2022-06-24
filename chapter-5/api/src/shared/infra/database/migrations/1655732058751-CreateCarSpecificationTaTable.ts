import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCarSpecificationTaTable1655732058751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'car_specifications',
                columns: [
                    {
                        name: 'car_id',
                        type: 'uuid'
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
        await queryRunner.createForeignKey('car_specifications', new TableForeignKey({
            name: 'FKCarSpecification',
            columnNames: ['specification_id'],
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
        }));
        await queryRunner.createForeignKey('car_specifications', new TableForeignKey({
            name: 'FKSpecificationCar',
            columnNames: ['car_id'],
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('car_specifications', 'FKSpecificationCar');
        await queryRunner.dropForeignKey('car_specifications', 'FKCarSpecification');
        await queryRunner.dropTable('car_specifications');
    }
}
