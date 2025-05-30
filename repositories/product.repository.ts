import { Between, MoreThanOrEqual, LessThanOrEqual, Repository } from "typeorm";
import Product from "../entities/product.entity";

class ProductRepository {
  constructor(private repository: Repository<Product>) {}

  async create(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async findAll(minPrice?: number, maxPrice?: number): Promise<Product[]> {
    const where: any = {};
    
    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    return this.repository.find({ where, order: { price: 'ASC' } });
  }

  async findById(id: number): Promise<Product> {
    return this.repository.findOne({
      where: { id },
    });
  }
}

export default ProductRepository;