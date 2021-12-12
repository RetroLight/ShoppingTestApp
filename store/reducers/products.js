import PRODUCTS from '../../data/dummy-data';
import {ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT} from "../actions/products";
import ProductCls from "../../models/productCls";


const initialState = {
    availableProducts: PRODUCTS,
    usersProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch(action.type) {
        case DELETE_PRODUCT:
            return(
                {
                    ...state,
                    usersProducts: state.usersProducts.filter(product => product.id !== action.pid),
                    availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
                }
            )
        case ADD_PRODUCT:
            const newProduct = new ProductCls(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageURL,
                action.productData.description,
                action.productData.price)

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                usersProducts: state.usersProducts.concat(newProduct)
            }
        case EDIT_PRODUCT:
            const productId = action.pid
            const usersProductIndex = state.usersProducts.findIndex(prod => prod.id === productId)
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === productId)
            const updatedProduct = new ProductCls(
                productId,
                state.usersProducts[usersProductIndex].ownerId,
                action.productData.title,
                action.productData.imageURL,
                action.productData.description,
                action.productData.price)

            const updatedUsersProducts = [...state.usersProducts];
            updatedUsersProducts[usersProductIndex] = updatedProduct;

            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                usersProducts: updatedUsersProducts
            }
    }
    return state
}
