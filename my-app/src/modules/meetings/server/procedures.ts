import { meetings } from "@/db/schema";
import { db } from "@/index";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { and, desc, eq, getTableColumns, ilike, count } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";

export const meetingsRouter = createTRPCRouter({
    // update: protectedProcedure.input(agentsUpdateSchema)
    //     .mutation(async ({ input, ctx }) => {
    //         const [updatedAgent] = await db.update(agents)
    //             .set(input)
    //             .where(and(
    //                 eq(agents.id, input.id),
    //                 eq(agents.userId, ctx.auth.user.id)
    //             ))
    //             .returning();
    //         if (!updatedAgent) {
    //             throw new TRPCError({
    //                 code: "NOT_FOUND",
    //                 message: "Agent not found"
    //             });
    //         }
    //         return updatedAgent;
    //     }),
    // remove: protectedProcedure.input(z.object({ id: z.string() }))
    //     .mutation(async ({ input, ctx }) => {
    //         const [removedAgent] = await db.delete(agents)
    //             .where(and(
    //                 eq(agents.id, input.id),
    //                 eq(agents.userId, ctx.auth.user.id)
    //             ))
    //             .returning();
    //         if (!removedAgent) {
    //             throw new TRPCError({
    //                 code: "NOT_FOUND",
    //                 message: "Agent not found"
    //             });
    //         }
    //         return removedAgent;
    //     }),
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingMeeting] = await db
            .select({
                ...getTableColumns(meetings)
            })
            .from(meetings)
            .where(and(
                eq(meetings.id, input.id),
                eq(meetings.userId, ctx.auth.user.id)
            ));
        if (!existingMeeting) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Meeting not found"
            });
        }
        return existingMeeting;
    }),
     getMany: protectedProcedure
     .input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
            .number()
            .min(MIN_PAGE_SIZE)
            .max(MAX_PAGE_SIZE)
            .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
     })).
     query(async ({ ctx, input}) => {
        const { search, page, pageSize } = input;

        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Meetings are not available yet."
        });

        const data = await db.
        select({
            ...getTableColumns(meetings)
        })
        .from(meetings)
        .where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search
                    ? ilike(meetings.name, `%${search}%`)
                    : undefined
            )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

        const [total] = await db
            .select({ count: count() })
            .from(meetings)
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search
                    ? ilike(meetings.name, `%${search}%`)
                    : undefined
                )
            )

        const totalPages = Math.ceil(total.count / pageSize);

        return {
            items: data,
            total: total.count,
            totalPages,
        };
    }),
    // create: protectedProcedure
    //     .input(agentsCreateSchema)
    //     .mutation(async ({ input, ctx }) => {
    //         const [createdAgent] = await db.insert(agents).values({
    //             ...input,
    //             userId: ctx.auth.user.id
    //         }).returning();

    //         return createdAgent;
    //     })
});