import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Cart from "./cart.entity";
import Product from "./product.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ type: "integer", default: 1 })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;
} 