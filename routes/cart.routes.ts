import { Router } from "express";
import CartService from "../services/cart.service";
import CartRepository from "../repositories/cart.repository";
import Cart from "../entities/cart.entity";
import dataSource from "../db/data-source";
import CartController from "../controller/cart.controller";
import ProductRepository from "../repositories/product.repository";
import Product from "../entities/product.entity";

const cartRouter = Router();

const cartRepository = new CartRepository(
  dataSource.getRepository(Cart)
);

const productRepository = new ProductRepository(
  dataSource.getRepository(Product)
);

const cartService = new CartService(cartRepository, productRepository);

new CartController(cartService, cartRouter);

export default cartRouter; 