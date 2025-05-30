import { Request, Response, Router, NextFunction } from "express";
import CartService from "../services/cart.service";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AddToCartDto } from "../dto/add-to-cart.dto";
import authMiddleware from "../middlewares/authMiddleware";

class CartController {
  constructor(
    private cartService: CartService,
    cartRouter: Router
  ) {
    cartRouter.use(authMiddleware);
    cartRouter.post("/", this.addToCart.bind(this));
    cartRouter.get("/", this.getCart.bind(this));
    cartRouter.delete("/items/:productId", this.removeFromCart.bind(this));
    cartRouter.put("/items/:productId", this.updateQuantity.bind(this));
    cartRouter.delete("/", this.clearCart.bind(this));
  }

  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addToCartDto = plainToInstance(AddToCartDto, req.body);
      const errors = await validate(addToCartDto);
      
      if (errors.length > 0) {
        return res.status(400).json({ message: "Invalid cart data", errors });
      }

      const cart = await this.cartService.addToCart(req.user.id, addToCartDto);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await this.cartService.getCart(req.user.id);
      res.status(200).json(cart || { items: [], total: 0 });
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = parseInt(req.params.productId);
      const cart = await this.cartService.removeFromCart(req.user.id, productId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };

  updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = parseInt(req.params.productId);
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cart = await this.cartService.updateQuantity(req.user.id, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.cartService.clearCart(req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default CartController; 