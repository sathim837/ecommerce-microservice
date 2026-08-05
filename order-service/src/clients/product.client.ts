import { http } from "../lib/axios";

export const getProduct = async (productId: string) => {
    try {
        // const response = await http.get(`${process.env.PRODUCT_SERVICE_URL}/api/v1/${productId}`);
        const response = await http.get(`${process.env.API_GATEWAY_URL}/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};

export const reduceStock = async (
    id: string,
    quantity: number
) => {

    const response = await http.patch(
        // `${process.env.PRODUCT_SERVICE_URL}/api/v1/${id}/stock`,
        `${process.env.API_GATEWAY_URL}/api/products/${id}/stock`,
        {
            quantity,
        }
    );

    return response.data;
};