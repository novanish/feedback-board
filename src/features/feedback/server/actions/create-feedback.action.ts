"use server";

import prisma from "@/database";
import {
  CreateFeedbackInput,
  CreateFeedBackSchema,
} from "@/features/feedback/schema/create-feedback.schema";
import { redirect } from "next/navigation";
import z from "zod";

export async function createFeedback(unsafeInput: CreateFeedbackInput) {
  const result = CreateFeedBackSchema.strip().safeParse(unsafeInput);
  if (!result.success) {
    const errors = z.treeifyError(result.error).properties;
    return { errorCode: "VALIDATION_ERROR", success: false, errors };
  }

  await prisma.feedback.create({
    data: result.data,
  });

  redirect("/feedback");
}
