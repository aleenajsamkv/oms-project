import { Router } from "express";
import ProductRepository from "../repositories/product.repository";
import ProductController from "../controller/product.controller";
import ProductService from "../services/product.service";
import Product from "../entities/product.entity";
import dataSource from "../db/data-source";

const productRouter = Router();

const productRepository = new ProductRepository(
  dataSource.getRepository(Product)
);

const productService = new ProductService(productRepository);

new ProductController(productService, productRouter);

export default productRouter;