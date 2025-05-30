import { Request, Response, Router, NextFunction } from "express";
import OrderService from "../services/order.service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateOrderDto } from "../dto/create.order.dto";
import authMiddleware from "../middlewares/authMiddleware";

class OrderController {
  constructor(
    private orderService: OrderService,
    orderRouter: Router
  ) {
    // orderRouter.use(authMiddleware);
    orderRouter.get("/all", this.getAllOrders.bind(this));
    orderRouter.post("/", this.createOrder.bind(this));
    orderRouter.get("/", this.getUserOrders.bind(this));
    orderRouter.get("/:id", this.getOrderById.bind(this));
    orderRouter.put("/:id", this.updateOrder.bind(this));
  }

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderDto = plainToInstance(CreateOrderDto, req.body);
      const errors = await validate(orderDto);
      
      if (errors.length > 0) {
        return res.status(400).json({ message: "Invalid order data", errors });
      }

      const order = await this.orderService.createOrder(orderDto.userId, orderDto.items);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getUserOrders(req.user.id);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await this.orderService.getOrderById(orderId);
      
      // Ensure user can only access their own orders
      if (order.userId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = parseInt(req.params.id);
      if (!req.body || !req.body.status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const order = await this.orderService.updateOrder(orderId, req.body.status);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
