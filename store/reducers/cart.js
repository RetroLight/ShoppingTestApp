import {ADD_TO_CART} from '../actions/cart';
import {REMOVE_FROM_CART} from '../actions/cart';
import CartItemCls from '../../models/cartItemCls';
import {ADD_ORDER} from '../actions/orders';
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    cartItems: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productImg = addedProduct.imageURL;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            const updatedOrNewCartItem = undefined;
            if (state.cartItems[addedProduct.id]) {
                const updatedOrNewCartItem = new CartItemCls(
                    productImg,
                    state.cartItems[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.cartItems[addedProduct.id].sum + productPrice
                )
                return {
                    ...state,
                    cartItems: {...state.cartItems, [addedProduct.id]: updatedOrNewCartItem},
                    totalAmount: state.totalAmount + productPrice
                }
            } else {
                const updatedOrNewCartItem = new CartItemCls(productImg, 1, productPrice, productTitle, productPrice);
                return {
                    ...state,
                    cartItems: {...state.cartItems, [addedProduct.id]: updatedOrNewCartItem},
                    totalAmount: state.totalAmount + productPrice
                }
            }
        case REMOVE_FROM_CART:
            const productId = action.productId;
            const selectedCartItem = state.cartItems[productId];
            let updatedCartProducts;
            if (state.cartItems[productId].quantity > 1) {
                const updatedCartProduct = new CartItemCls(
                    selectedCartItem.itemImg,
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice);

                updatedCartProducts = {...state.cartItems, [productId]: updatedCartProduct}
            } else {
                updatedCartProducts = {...state.cartItems}
                delete updatedCartProducts[productId]
            }
            return {
                ...state,
                cartItems: updatedCartProducts,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if(!state.cartItems[action.pid]) {
                return state
            }
            const updatedItems = {...state.cartItems}
            const deletedProductPrice = updatedItems[action.pid].sum
            delete updatedItems[action.pid]
            return {
                ...state,
                cartItems: updatedItems,
                totalAmount: state.totalAmount - deletedProductPrice
            }
        default:
            return state;
    }
};
