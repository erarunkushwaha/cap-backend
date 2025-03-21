import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CartValidators } from "../validators/CartValidators";
import { CartController } from "../controllers/CartController";

class CartRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/getCart', GlobalMiddleWare.auth, CartController.getUserCart);
    }

    postRoutes() {
        this.router.post('/create', GlobalMiddleWare.auth, CartValidators.addToCart(), GlobalMiddleWare.checkError, CartController.addToCart);
    }

    patchRoutes() {
    }

    putRoutes() {
    }

    deleteRoutes() {
    }

}

export default new CartRouter().router;