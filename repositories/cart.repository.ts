import { Repository } from "typeorm";
import Cart from "../entities/cart.entity";

class CartRepository {
  constructor(private repository: Repository<Cart>) {}

  async findByUserId(userId: number): Promise<Cart | null> {
    return this.repository.findOne({
      where: { userId },
      relations: ["items", "items.product"]
    });
  }

  async create(cart: Cart): Promise<Cart> {
    return this.repository.save(cart);
  }

  async update(cart: Cart): Promise<Cart> {
    return this.repository.save(cart);
  }

  async delete(cartId: number): Promise<void> {
    await this.repository.delete(cartId);
  }
}

export default CartRepository; 