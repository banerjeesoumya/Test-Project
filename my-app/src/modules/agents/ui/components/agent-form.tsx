"use client";

import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
// import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsCreateSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValue?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValue,
} : AgentFormProps) => {

    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );
                if (initialValue?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValue.id })
                    );
                }
                // router.refresh();
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message)
            },
        }),
    );

    const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );
                if (initialValue?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValue.id })
                    );
                }
                // router.refresh();
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message)
            },
        }),
    );

    const form  = useForm<z.infer<typeof agentsCreateSchema>>({
        resolver: zodResolver(agentsCreateSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            instructions: initialValue?.instructions ?? "",
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createAgent.isPending || updateAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsCreateSchema>) => {
        if (isEdit) {
            updateAgent.mutate({ id: initialValue.id, ...values });
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                       <FormLabel>Name</FormLabel>
                       <FormControl>
                        <Input {...field} placeholder="Enter agent name" />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                )} />
                <FormField name="instructions" control={form.control} render={({ field }) => (
                    <FormItem>
                       <FormLabel>Instructions</FormLabel>
                       <FormControl>
                        <Textarea {...field} placeholder="Enter agent instructions" />
                       </FormControl>
                       <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-between gap-2">
                    {onCancel && (
                        <Button variant="ghost" type="button" onClick={() => onCancel()} disabled={isPending}>Cancel</Button>
                    )}
                    <Button type="submit" disabled={isPending}>{isEdit ? "Save Changes" : "Create Agent"}</Button>
                </div>
            </form>
        </Form>
    )
}