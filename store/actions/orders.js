export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (orderItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: {
            orderItems: orderItems,
            totalAmount: totalAmount
        }
    }
}
