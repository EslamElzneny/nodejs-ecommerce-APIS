import { _CartService } from "../services/cart.service.js";


class CartControllers {
    constructor(){
    }

    index = _CartService.getLoggedUserCart;

    addToCart = _CartService.addToCart;
    
    updateCartItemQuantity = _CartService.updateCartItemQuantity;

    removeSpecificCartItem = _CartService.removeSpecificCartItem;

    clearCart = _CartService.clearCart;

}

export const _CartControllers = new CartControllers;
