import { EditFeeback } from "@/features/feedback/components/edit-feedback";
import { Metadata } from "next";

export default async function EditFeedbackPage({
  params,
}: PageProps<"/feedback/[feedbackId]/edit">) {
  const { feedbackId } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <EditFeeback feedbackId={feedbackId} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Edit Feedback",
  description: "Edit your feedback on Feedback Board.",
};
