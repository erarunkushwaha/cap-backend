import { Router } from "express";
import { StoreController } from "../controllers/StoreController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { StoreValidators } from "../validators/StoreValidators";

class StoreRouter {

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
        this.router.get('/getStores', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, StoreController.getStores);
        this.router.get('/getAllStores', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, StoreController.getAllStores);
        this.router.get('/searchStores', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, StoreValidators.searchStores(), GlobalMiddleWare.checkError, StoreController.searchStores);
    }

    postRoutes() {
        this.router.post('/create', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, new Utils().multer.single('storeImages'), StoreValidators.addStore(), GlobalMiddleWare.checkError, StoreController.addStore);
    }

    patchRoutes() {
    }

    putRoutes() {}

    deleteRoutes() {}

}

export default new StoreRouter().router;