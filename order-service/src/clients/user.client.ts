import { http } from "../lib/axios";

export const getUser = async (userId: string) => {
    try {
        const response = await http.get(`${process.env.USER_SERVICE_URL}/api/v1/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};