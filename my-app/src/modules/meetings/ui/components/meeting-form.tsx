"use client";

import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
// import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsCreateSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Selector } from "@/components/selector";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/agent-dialog";

interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValue?: MeetingGetOne;
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValue,
} : MeetingFormProps) => {

    const trpc = useTRPC();
    // const router = useRouter();
    const queryClient = useQueryClient();

    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
    const [agent, setAgent] = useState("");

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search: agent,
        }),
    );

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );
                if (initialValue?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValue.id })
                    );
                }
                // router.refresh();
                onSuccess?.(data.id);
            },
            onError: (error) => {
                toast.error(error.message)
            },
        }),
    );

    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );
                if (initialValue?.id) {
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({ id: initialValue.id })
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

    const form  = useForm<z.infer<typeof meetingsCreateSchema>>({
        resolver: zodResolver(meetingsCreateSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            agentId: initialValue?.agentId ?? "",
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsCreateSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ id: initialValue.id, ...values });
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <>
            <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Enter meeting name" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="agentId" control={form.control} render={({ field }) => (
                        <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <FormControl>
                            <Selector 
                                options={(agents.data?.items ?? []).map((agent) => ({
                                    id: agent.id,
                                    value: agent.id,
                                    children: (
                                        <div className="flex items-center gap-x-2">
                                            <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="border size-6" />
                                            <span className="align-middle">{agent.name} </span>
                                        </div>
                                    )
                                }))}
                                onSelect={field.onChange}
                                onSearch={setAgent}
                                value={field.value}
                                placeholder="Select an agent"
                            />
                        </FormControl>
                        <FormDescription >
                                Not seeing the agent you want?{" "}
                                <button type="button" className="text-primary hover:underline" onClick={() => setOpenNewAgentDialog(true)}>
                                    Create new agent
                                </button>
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-between gap-2">
                        {onCancel && (
                            <Button variant="ghost" type="button" onClick={() => onCancel()} disabled={isPending}>Cancel</Button>
                        )}
                        <Button type="submit" disabled={isPending}>{isEdit ? "Save Changes" : "Create Meeting"}</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}