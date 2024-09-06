export const OrderStatus = {
    PENDING:'PENDING',
    INPROGRESS:'INPROGRESS',
    IN_DELIVERY:'IN_DELIVERY',
    DELIVERED:'DELIVERED',
    FAIL:'FAIL',
    REFUND:'REFUND'
}
OrderStatus.ENUM = Object.keys(OrderStatus);
OrderStatus.DEFAULT = OrderStatus.PENDING;
