import Order from '../../models/orderCls';
import {ADD_ORDER} from "../actions/orders";
const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.orderItems,
                action.orderData.totalAmount,
                new Date()
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state
}
