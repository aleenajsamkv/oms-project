import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}

export default Product;
