import productApi from "../api/productApi";

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
  const response = await productApi.get("/api/v1", {
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
  const response = await productApi.get(`/api/v1/${id}`);

  return response.data;
};