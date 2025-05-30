import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity()
class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true
  })
  items: CartItem[];

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total: number;
}

export default Cart; 