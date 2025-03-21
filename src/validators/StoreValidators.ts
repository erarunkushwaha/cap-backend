import { body, query } from "express-validator";
import User from "../models/User";

export class StoreValidators {

    static addStore() {
        return [
            body('name', 'Owner Name is required').isString(),
            body('email', 'Email is required').isEmail()
            .custom((email, {req}) => {
                return User.findOne({
                    email: email,
                    // type: 'user'
                }).then(user => {
                    if (user) {
                        // throw new Error('User Already Exists');
                        throw('User Already Exists');
                    } else {
                        return true;
                    }
                }).catch(e => {
                    throw new Error(e);
                })
            }),
            body('phone', 'Phone number is required').isString()
            .custom((phone, {req}) => {
                return User.findOne({
                    phone: phone,
                    type: 'store'
                }).then(user => {
                    if (user) {
                        // throw new Error('User Already Exists');
                        throw('User Already Exists');
                    } else {
                        return true;
                    }
                }).catch(e => {
                    throw new Error(e);
                })
            }),
            body('password', 'Password is required').isAlphanumeric()
                .isLength({ min: 8, max: 20 })
                .withMessage('Password must be between 8-20 characters'),
            
            // body('storeImages', 'Cover image is required')
            // .custom((cover, {req}) => {
            //     if(req.file) {
            //         return true;
            //     } else {
            //         // throw new Error('File not uploaded');
            //         throw('File not uploaded');
            //     }
            // }),
            body('store_name', 'Store Name is required').isString(),
            body('status', 'Status is required').isString(),
            body('address', 'Address is required').isString(),
            body('location', 'Location is required').isString(),
            body('city_id', 'City is required').isString(),
        ];
    }

    static searchStores() {
        return [
            query('name', 'Search query is required').isString()
        ];
    }
}