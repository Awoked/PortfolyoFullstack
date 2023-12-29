import * as z from "zod";

export const contactSchema = z.object({
    name: z.string().max(150),
    email: z.string().email({ message: "Geçersiz mail adresi." }),
    message: z.string().max(65000)
})

export type Contact = z.infer<typeof contactSchema>