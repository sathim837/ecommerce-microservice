import {Category} from "../models/category.model";

const categoryRepository = {
  async createCategory(data: any) {
    const category = new Category(data);
    return await category.save();
  },

  async getAllCategories() {
    return await Category.find();
  }
};

export { categoryRepository };