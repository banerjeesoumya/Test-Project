import { z } from "zod";

export const agentsCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instructions: z.string().min(1, { message: "Instructions are required" })
})

export const agentsUpdateSchema = agentsCreateSchema.extend({
    id: z.string().min(1, { message: "ID is required" })
})