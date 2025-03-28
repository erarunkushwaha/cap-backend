import { Utils } from "./../utils/Utils";
import { BannerValidators } from "./../validators/BannerValidators";
import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { BannerController } from "../controllers/BannerController";

class BannerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/banners",
      GlobalMiddleWare.auth,
      BannerController.getBanners
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("bannerImages"),
      BannerValidators.addBanner(),
      GlobalMiddleWare.checkError,
      BannerController.addBanner
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      BannerController.deleteBanner
    );
  }
}

export default new BannerRouter().router;
