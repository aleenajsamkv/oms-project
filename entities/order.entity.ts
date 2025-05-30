import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ default: "pending" })
  status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true
  })
  items: OrderItem[];
}

export default Order;