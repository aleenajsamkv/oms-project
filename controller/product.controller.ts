import { Request, Response, Router, NextFunction } from "express";
import ProductService from "../services/product.service";
import HttpException from "../exception/httpException";
import { validate } from "class-validator";
import { CreateProductDto } from "../dto/create.product.dto";
import { plainToInstance } from "class-transformer";

class ProductController {
  constructor(
    private productService: ProductService,
    productRouter: Router
  ) {
    productRouter.post("/", this.createProduct);
    productRouter.get("/", this.getAllProducts);
    productRouter.get("/:id", this.getProductById);
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createProductDto = plainToInstance(CreateProductDto, req.body);
      const error = await validate(createProductDto);

      if (error.length > 0) {
        throw new HttpException(400, JSON.stringify(error));
      }

      const product = await this.productService.createProduct(createProductDto);

      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
      const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
      
      const products = await this.productService.getAllProducts(minPrice, maxPrice);
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching products" });
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.getProductById(id);
      if (!product) {
        throw new HttpException(404, "Product not found");
      }

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default ProductController;
