import dotenv from "dotenv";
dotenv.config();


export const PORT = process.env.PORT || 3001;
export const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:root@user-db:3306/userdb";  

export const env = {
    PORT,
    DATABASE_URL
};

