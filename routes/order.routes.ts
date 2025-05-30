import { Router } from "express";
import OrderService from "../services/order.service";
import OrderRepository from "../repositories/order.repository";
import Order from "../entities/order.entity";
import dataSource from "../db/data-source";
import OrderController from "../controller/order.controller";
import Product from "../entities/product.entity";
import ProductRepository from "../repositories/product.repository";

const orderRouter = Router();

const orderRepository = new OrderRepository(
  dataSource.getRepository(Order)
);

const productRepository = new ProductRepository(
  dataSource.getRepository(Product)
);

const orderService = new OrderService(orderRepository, productRepository);

new OrderController(orderService, orderRouter);

export default orderRouter;