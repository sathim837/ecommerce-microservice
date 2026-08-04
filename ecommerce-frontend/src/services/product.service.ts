// import productApi from "../api/productApi";
import api from "../api/axios";

interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  maxPrice?: number;
}

export const getProducts = async ({
  page = 1,
  limit = 10,
  search = "",
  maxPrice,
}: ProductQuery = {}) => {
  const response = await api.get("/products", {
    params: {
      page,
      limit,
      search,
      maxPrice,
    },
  });

  return response.data.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};