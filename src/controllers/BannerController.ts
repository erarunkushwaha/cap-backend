import Banner from "../models/Banner";

export class BannerController {
  static async addBanner(req, res, next) {
    try {
      const path = req.file?.path;
      if (!path) {
        return res.status(400).send({ message: "Banner image is required" });
      }
      const data = { banner: path };
      const banner = await new Banner(data).save();
      res.status(201).send(banner);
    } catch (e) {
      next(e);
    }
  }

  static async getBanners(req, res, next) {
    try {
      const banners = await Banner.find({}, { __v: 0 });
      res.send(banners);
    } catch (e) {
      next(e);
    }
  }

  static async getBannerById(req, res, next) {
    try {
      const banner = await Banner.findById(req.params.id, { __v: 0 });
      if (!banner) {
        return res.status(404).send({ message: "Banner not found" });
      }
      res.send(banner);
    } catch (e) {
      next(e);
    }
  }

  static async updateBanner(req, res, next) {
    try {
      let data = req.body;
      if (req.file) data.banner = req.file.path;
      data.updated_at = new Date();

      const banner = await Banner.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!banner) {
        return res.status(404).send({ message: "Banner not found" });
      }
      res.send(banner);
    } catch (e) {
      next(e);
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const banner = await Banner.findByIdAndDelete(req.params.id);
      if (!banner) {
        return res.status(404).send({ message: "Banner not found" });
      }
      res.send({ message: "Banner deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}
