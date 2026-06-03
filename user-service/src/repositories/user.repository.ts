import {prisma} from "../utils/prisma";

export class UserRepository {
    async findAll() {
        console.log("UserRepository: Fetching all users from database...");
        return await prisma.user.findMany();
    }

    async findByEmail(email: string) {
        console.log(`UserRepository: Fetching user by email: ${email}`);
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async create(userData: { email: string; password: string; name: string }) {
        console.log(`UserRepository: Creating user with email: ${userData.email}`);
        return await prisma.user.create({
            data: userData
        });
    }
}