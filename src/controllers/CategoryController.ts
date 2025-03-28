import Category from "../models/Category";

export class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.find({}, { __v: 0 });
      res.send(categories);
    } catch (e) {
      next(e);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const category = await Category.findById(req.params.id, { __v: 0 });
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.send(category);
    } catch (e) {
      next(e);
    }
  }

  static async addCategory(req, res, next) {
    const { name, status } = req.body;
    try {
      let data = { name, status };
      //   if (req.file) data = { ...data, photo: req.file.path };
      const category = await new Category(data).save();
      res.status(201).send(category);
    } catch (e) {
      next(e);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      let data = req.body;
      if (req.file) data.photo = req.file.path;
      data.updated_at = new Date();

      const category = await Category.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.send(category);
    } catch (e) {
      next(e);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.send({ message: "Category deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}
