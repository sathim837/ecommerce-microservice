import { Product } from "../models/product.model";

export class ProductRepository {
  async createProduct(data: any) {
    const product = new Product(data);
    return await product.save();
  }

  async getAllProducts(query: any) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
      sort = "-createdAt",
    } = query;

    const filter: any = {};

    // Search
    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);

      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter)
      .populate("category")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);
    return {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      products,
    };
  }
}
