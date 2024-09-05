import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { Cart } from "../models/Cart.model.js";
import { Product } from "../models/Product.model.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";
import { httpStatus } from "../utils/httpStatus.js";

class CartService {
    constructor(){}

    getLoggedUserCart = asyncWrapper(
        async (req,res,next) => {
            let cart = await Cart.findOne({ user: req.user._id });
            
            if(!cart) cart = {};
            console.log(cart);
            return res.status(200).json(httpResp.success(cart))
        }
    );

    calcTotalCartPrice = (cart) => {
        let totalPrice = 0;
        cart.cartItems.forEach((item) => {
          totalPrice += item.quantity * item.price;
        });
        cart.totalCartPrice = totalPrice;
        cart.totalPriceAfterDiscount = undefined;
        return totalPrice;
    };

    addToCart = asyncWrapper(
        async (req,res,next)=>{

            const { productId, color , size } = req.body;
            const product = await Product.findById(productId);

            if(!product){
                const error = _AppError.create(`Product Not Found`,404,httpStatus.FAIL)
                return next(error);
            }
          
            // 1) Get Cart for logged user
            let cart = await Cart.findOne({ user: req.user._id });
          
            if (!cart) {
              // create cart fot logged user with product
              cart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product: productId, color, size, price: product.price , product_name:product.title}],
              });
            } else {
              // product exist in cart, update product quantity
              const productIndex = cart.cartItems.findIndex(
                (item) => item.product.toString() == productId && item.color == color && item.size == size
              );
          
              if (productIndex > -1) {
                const cartItem = cart.cartItems[productIndex];
                cartItem.quantity += 1;
          
                cart.cartItems[productIndex] = cartItem;
              } else {
                // product not exist in cart,  push product to cartItems array
                cart.cartItems.push({ product: productId, color,size, price: product.price, product_name:product.title });
              }
            }
          
            // Calculate total cart price
            this.calcTotalCartPrice(cart);
            await cart.save();

            return res.status(201).json(httpResp.success(cart))

        }
    );


    removeSpecificCartItem = asyncWrapper(
        async (req,res,next) => {
            const cart = await Cart.findOneAndUpdate(
                { user: req.user._id },
                {
                  $pull: { cartItems: { _id: req.params.itemId } },
                },
                { new: true }
            );
            
            this.calcTotalCartPrice(cart);
            cart.save();

            return res.status(200).json(httpResp.success(cart))
            
        }
    );

    clearCart = asyncWrapper(
        async (req,res,next) => {
            const doc = await Cart.findOneAndDelete({ user: req.user._id });
            return res.status(200).json(httpResp.success({}))
            
        }
    );

    updateCartItemQuantity = asyncWrapper(
        async (req,res,next) => {
            const { quantity } = req.body;
            
            let cart = await Cart.findOne({ user: req.user._id });
            if (!cart) {
                const error = _AppError.create(`There is no cart for user ${req.user.name}`,404,httpStatus.FAIL)
                return next(error);
            }

            
            const itemIndex = cart.cartItems.findIndex(
                (item) => item._id.toString() === req.params.itemId
            );
            if (itemIndex > -1) {
                const cartItem = cart.cartItems[itemIndex];
                cartItem.quantity = quantity;
                cart.cartItems[itemIndex] = cartItem;
            } else {
                return next(_AppError.create(`there is no item for this id :${req.params.itemId}`,404,httpStatus.FAIL));
            }

            this.calcTotalCartPrice(cart);

            await cart.save();
            return res.status(200).json(httpResp.success(cart))
            
        }
    );




}

export const _CartService = new CartService;
