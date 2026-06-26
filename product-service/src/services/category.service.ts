import {categoryRepository} from "../repositories/category.repository";

const categoryService = {
  async createCategory(data: any) {
    return await categoryRepository.createCategory(data);
  },

  async getAllCategories() {
    return await categoryRepository.getAllCategories();
  }
};

export { categoryService };