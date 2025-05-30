import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProducts1748336563381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO product (name, description, price, stock) VALUES 
            ('iPhone 14 Pro', 'Latest Apple iPhone with dynamic island', 999.99, 50),
            ('Samsung Galaxy S23', 'Flagship Android smartphone', 899.99, 45),
            ('MacBook Pro 16"', 'Apple M2 Pro chip, 16GB RAM', 2499.99, 25),
            ('Dell XPS 15', '12th Gen Intel i7, 32GB RAM', 1899.99, 30),
            ('iPad Air', '10.9-inch display, M1 chip', 599.99, 60),
            ('AirPods Pro', 'Active noise cancellation', 249.99, 100),
            ('Sony WH-1000XM4', 'Wireless noise cancelling headphones', 349.99, 40),
            ('Nintendo Switch OLED', '7-inch OLED screen', 349.99, 35),
            ('PS5', 'Sony PlayStation 5 Digital Edition', 499.99, 20),
            ('Xbox Series X', 'Microsoft latest gaming console', 499.99, 25)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product`);
    }

}

