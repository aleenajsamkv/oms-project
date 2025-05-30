import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import Order from "./order.entity";
import Product from "./product.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { nullable: false })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ type: "integer", default: 1, nullable: false })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;
}
