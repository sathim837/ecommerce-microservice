import { z } from "zod";

export const UserLoginDto = z.object({
    email: z.email(),
    password: z.string().min(6).max(100),
});

export type UserLoginDtoType = z.infer<typeof UserLoginDto>;