import { body, query } from "express-validator";
import Category from "../models/Category";
import Store from "../models/Store";

export class ItemValidators {

    static addItem() {
        return [
            // body('itemImages', 'Cover image is required')
            // .custom((cover, {req}) => {
            //     if(req.files) {
            //         return true;
            //     } else {
            //         // throw new Error('File not uploaded');
            //         throw('File not uploaded');
            //     }
            // }),
            body('name', 'Product Name is required').isString(),
            body('store_id', 'Store Id is required').isString()
            .custom((store_id, {req}) => {
                return Store.findById(store_id).then(store => {
                    if (store) {
                        if(req.user.type == 'admin' || store.user_id == req.user.aud) return true;
                        // throw new Error('You are not an Authorized User for this Store');
                        throw('You are not an Authorized User for this Store');
                    } else {
                        // throw new Error('Store doesnot exist');
                        throw('Store doesnot exist');
                    }
                }).catch(e => {
                    throw new Error(e);
                })
            }),
            body('category_id', 'Category Id is required').isString()
            .custom((category_id, {req}) => {
                return Category.findOne({_id: category_id, store_id: req.body.store_id}).then(category => {
                    if (category) {
                        return true;
                    } else {
                        // throw new Error('Category doesnot exist');
                        throw('Category doesnot exist');
                    }
                }).catch(e => {
                    throw new Error(e);
                })
            }),
            body('price', 'Price is required').isString(),
            body('status', 'Status is required').isBoolean(),
        ];
    }

    static getProductsByCategory() {
        return [
            query('category_id', 'Category is required').isString()
        ];
    }
}