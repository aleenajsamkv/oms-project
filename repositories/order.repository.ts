import { Repository } from "typeorm";
import Order from "../entities/order.entity";

class OrderRepository {
  constructor(private repository: Repository<Order>) {}

  async create(order: Order): Promise<Order> {
    return this.repository.save(order);
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["items", "items.product"]
    });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.repository.find({
      where: { userId },
      relations: ["items", "items.product"],
      order: { id: 'DESC' }
    });
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find({
      relations: ["items", "items.product"],
      order: { id: 'DESC' }
    });
  }

  async update(order: Order): Promise<Order> {
    return this.repository.save(order);
  }
}

export default OrderRepository;
