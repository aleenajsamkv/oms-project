import { CreateProductDto } from "../dto/create.product.dto";
import Product from "../entities/product.entity";
import ProductRepository from "../repositories/product.repository";

class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.stock = product.stock;
    return this.productRepository.create(newProduct);
  }

  async getAllProducts(minPrice?: number, maxPrice?: number) {
    return this.productRepository.findAll(minPrice, maxPrice);
  }

  async getProductById(id: number) {
    return this.productRepository.findById(id);
  }
}

export default ProductService;