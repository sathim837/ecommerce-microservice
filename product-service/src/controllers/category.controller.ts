import { categoryService } from "../services/category.service";

const CategoryController = {
  async createCategory(req: any, res: any) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Error creating category", error });
    }
  },

  async getAllCategories(req: any, res: any) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  },
};

export default CategoryController;
