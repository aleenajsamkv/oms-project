import { CreateOrderItemDto } from "../dto/create.orderitem.dto";
import Order from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";
import OrderRepository from "../repositories/order.repository";
import ProductRepository from "../repositories/product.repository";
import HttpException from "../exception/httpException";
import QueueService from "./queue.service";

class OrderService {
  private queueService: QueueService;

  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {
    this.queueService = new QueueService();
    this.connectQueue();
  }

  private async connectQueue() {
    try {
      await this.queueService.connect();
    } catch (error) {
      console.error('Failed to connect to queue:', error);
    }
  }

  async createOrder(userId: number, items: CreateOrderItemDto[]): Promise<Order> {
    const orderItems: OrderItem[] = [];
    let total = 0;

    // Create order items and calculate total
    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new HttpException(404, `Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new HttpException(400, `Insufficient stock for product ${product.name}`);
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = item.quantity;
      orderItem.price = product.price;

      // Update product stock
      product.stock -= item.quantity;
      await this.productRepository.create(product);

      orderItems.push(orderItem);
      total += product.price * item.quantity;
    }

    // Create order
    const order = new Order();
    order.userId = userId;
    order.total = total;
    order.items = orderItems;

    const savedOrder = await this.orderRepository.create(order);

    // Send order to queue for invoice generation
    try {
      await this.queueService.sendOrderMessage(savedOrder);
    } catch (error) {
      console.error('Failed to send order to queue:', error);
    }

    return savedOrder;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new HttpException(404, "Order not found");
    }
    return order;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async updateOrder(id: number, status: string): Promise<Order> {
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new HttpException(404, "Order not found");
    }

    existingOrder.status = status;

    return this.orderRepository.update(existingOrder);
  }
}

export default OrderService;
