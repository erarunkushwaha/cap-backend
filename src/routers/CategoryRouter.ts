import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CategoryValidators } from "../validators/CategoryValidators";
import { Utils } from "../utils/Utils";

class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/getCategories",
      GlobalMiddleWare.auth,
      CategoryController.getCategories
    );
    this.router.get(
      "/getCategoryById",
      GlobalMiddleWare.auth,
      CategoryController.getCategoryById
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("categoryImages"),
      CategoryValidators.addCategory(),
      GlobalMiddleWare.checkError,
      CategoryController.addCategory
    );
    this.router.patch(
      "/edit/:id",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("categoryImages"),
      CategoryValidators.addCategory(),
      GlobalMiddleWare.checkError,
      CategoryController.updateCategory
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      CategoryController.deleteCategory
    );
  }
}

export default new CategoryRouter().router;
