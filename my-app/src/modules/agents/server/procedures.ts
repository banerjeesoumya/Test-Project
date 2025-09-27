import { agents } from "@/db/schema";
import { db } from "@/index";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents);

        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // throw new TRPCError({ message: "Error fetching agents", code: "INTERNAL_SERVER_ERROR" });
        return data;
    })
})