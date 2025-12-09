"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FEEDBACK_STATUS_OPTIONS } from "@/features/feedback/constants/feedback-status-options.const";
import { useCreateFeedback } from "@/features/feedback/hooks/use-create-feedback";
import { useUpdateFeedback } from "@/features/feedback/hooks/use-update-feedback";
import {
  CreateFeedbackInput,
  CreateFeedBackSchema,
} from "@/features/feedback/schema/create-feedback.schema";
import { FeedbackStatus } from "@/generated/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

type Props = {
  defaultValues?: Partial<CreateFeedbackInput> | undefined;
} & (
  | {
      type?: "create";
      feedbackId?: never;
    }
  | {
      type: "update";
      feedbackId: string;
    }
);

export function FeedbackForm({
  type = "create",
  feedbackId,
  defaultValues = {},
}: Props) {
  const isUpdate = type === "update";
  const form = useForm({
    resolver: zodResolver(CreateFeedBackSchema),
    defaultValues: {
      title: "",
      description: "",
      status: FeedbackStatus.OPEN,
      ...defaultValues,
    },
  });

  const updateMutation = useUpdateFeedback();
  const createMutation = useCreateFeedback();

  async function handleSubmit(data: CreateFeedbackInput) {
    if (isUpdate && feedbackId) {
      return updateMutation.mutate({ id: feedbackId, ...data });
    }

    return createMutation.mutate(data);
  }

  const isSaving = updateMutation.isPending || createMutation.isPending;
  const statusOptions = isUpdate
    ? FEEDBACK_STATUS_OPTIONS
    : FEEDBACK_STATUS_OPTIONS.filter(
        (option) => option.value !== FeedbackStatus.DONE,
      );

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          {isUpdate ? "Update Feedback" : "Create Feedback"}
        </CardTitle>
        <CardDescription>
          What&apos;s on your mind? We&apos;d love to hear your thoughts and
          feedback!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="feedback-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="A concise title for your feedback"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Feedback Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      placeholder="Provide a detailed description of your feedback"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/
                        {CreateFeedBackSchema.shape.description.maxLength}{" "}
                        characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Be as specific as possible to help us understand your
                    feedback.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="justify-end gap-2">
          <Button type="submit" form="feedback-form" disabled={isSaving}>
            Submit
          </Button>
          <Button disabled={isSaving} asChild variant="ghost">
            <Link href={"/feedback"}>Cancel</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
