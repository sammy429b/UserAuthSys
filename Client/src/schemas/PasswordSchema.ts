import { z } from "zod";

export const ChangePasswordSchema = z.object({
    email: z.string().email(),
    oldPassword: z.string().min(6).refine(
        (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
        { message: "Password must contain at least one Capital letter, one number, and one special character" }),
    newPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(
            (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
            { message: "Password must contain at least one Capital letter, one number, and one special character" }
        )
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(6).refine(
        (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
        { message: "Password must contain at least one Capital letter, one number, and one special character" }),
    rerenterPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(
            (value) => /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value),
            { message: "Password must contain at least one Capital letter, one number, and one special character" }
        )
});



export const ForgotPasswordOTPSchema = z.object({
    email: z.string().email(),
});