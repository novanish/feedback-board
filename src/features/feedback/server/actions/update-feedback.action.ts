"use server";

import prisma from "@/database";
import {
  UpdateFeedbackInput,
  UpdateFeedBackSchema,
} from "@/features/feedback/schema/update-feedback.schema";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function updateFeedback(unsafeInput: UpdateFeedbackInput) {
  const result = UpdateFeedBackSchema.strip().safeParse(unsafeInput);
  if (!result.success) {
    const errors = z.treeifyError(result.error).properties;
    return { errorCode: "VALIDATION_ERROR", success: false, errors };
  }

  await prisma.feedback.update({
    where: { id: result.data.id },
    data: result.data,
  });

  redirect("/feedback");
}
