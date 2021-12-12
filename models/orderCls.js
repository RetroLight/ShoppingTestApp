import moment from "moment";

class Order {
    constructor(orderId, orderItems, totalAmount, date) {
        this.orderId = orderId,
        this.orderItems = orderItems,
        this.totalAmount = totalAmount,
        this.date = date
    }
    get readableDate() {
        moment.locale('ru')
        return moment(this.date).format('MMMM Do YYYY, hh:mm' )
    }
}

export default Order;
