import { body } from "express-validator";

export class CartValidators {

    static addToCart() {
        return [
            body('products', 'Product Items is required').isString(),
            body('status', 'Order status is required').isString(),
            body('total', 'Cart Total is required').isNumeric(),
            // body('grandTotal', 'Cart GrandTotal is required').isNumeric(),
            // body('deliveryCharge', 'Delivery Charge is required').isNumeric()
        ];
    }
}