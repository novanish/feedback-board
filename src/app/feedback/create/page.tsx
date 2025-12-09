import { CreateFeedback } from "@/features/feedback/components/create-feedback";
import { Metadata } from "next";

export default function CreateFeedbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <CreateFeedback />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Create Feedback",
  description: "Create a new feedback on Feedback Board.",
};
