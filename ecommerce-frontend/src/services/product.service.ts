import productApi from "../api/productApi";

// export const getProducts = async () => {
//   const response = await productApi.get(
//     "/api/v1"
//   );

//   return response.data.data.products;
// };

export const getProducts = async (
  page = 1,
  limit = 10,
  maxPrice = 1000
) => {
  const response = await productApi.get("/api/v1", {
    params: {
      page,
      limit,
      maxPrice,
    },
  });

  return response.data.data.products;
};