import { AddToCartDto } from "../dto/add-to-cart.dto";
import Cart from "../entities/cart.entity";
import { CartItem } from "../entities/cart-item.entity";
import CartRepository from "../repositories/cart.repository";
import ProductRepository from "../repositories/product.repository";
import HttpException from "../exception/httpException";

class CartService {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository
  ) {}

  async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<Cart> {
    const { productId, quantity } = addToCartDto;

    // Get or create cart
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = new Cart();
      cart.userId = userId;
      cart.items = [];
      cart.total = 0;
    }

    // Check product exists and has stock
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new HttpException(404, `Product ${productId} not found`);
    }
    if (product.stock < quantity) {
      throw new HttpException(400, `Insufficient stock for product ${product.name}`);
    }

    // Check if product already in cart
    let cartItem = cart.items.find(item => item.product.id === productId);
    if (cartItem) {
      // Update quantity if product already in cart
      cartItem.quantity += quantity;
      cartItem.price = product.price;
    } else {
      // Add new cart item
      cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = quantity;
      cartItem.price = product.price;
      cartItem.cart = cart;
      cart.items.push(cartItem);
    }

    // Update cart total
    cart.total = cart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    return this.cartRepository.update(cart);
  }

  async getCart(userId: number): Promise<Cart | null> {
    return this.cartRepository.findByUserId(userId);
  }

  async removeFromCart(userId: number, productId: number): Promise<Cart> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new HttpException(404, "Cart not found");
    }

    // Remove item from cart
    cart.items = cart.items.filter(item => item.product.id !== productId);

    // Update cart total
    cart.total = cart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    return this.cartRepository.update(cart);
  }

  async updateQuantity(userId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new HttpException(404, "Cart not found");
    }

    const cartItem = cart.items.find(item => item.product.id === productId);
    if (!cartItem) {
      throw new HttpException(404, "Product not found in cart");
    }

    // Check stock
    if (cartItem.product.stock < quantity) {
      throw new HttpException(400, `Insufficient stock for product ${cartItem.product.name}`);
    }

    // Update quantity
    cartItem.quantity = quantity;

    // Update cart total
    cart.total = cart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    return this.cartRepository.update(cart);
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (cart) {
      await this.cartRepository.delete(cart.id);
    }
  }
}

export default CartService; 