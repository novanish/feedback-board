import { NotFoundError } from "@/errors/not-found";
import { FeedbackFilters } from "@/features/feedback/types/feedback-filters.type";
import {
  GetFeedbackResponse,
  GetFeedbacksResponse,
} from "@/features/feedback/types/response.type";

export const feedbackService = {
  getFeedbacks: async (
    cursor: string | null,
    filters: FeedbackFilters,
  ): Promise<GetFeedbacksResponse> => {
    const queryParams = new URLSearchParams();
    if (cursor) {
      queryParams.append("cursor", cursor);
    }
    if (filters?.status) {
      queryParams.append("status", filters.status);
    }

    const searchParams = queryParams.toString();
    const response = await fetch(
      `/api/feedback${searchParams ? `?${searchParams}` : ""}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks");
    }

    return response.json();
  },

  getFeedback: async (id: string): Promise<GetFeedbackResponse> => {
    const response = await fetch(`/api/feedback/${id}`);
    if (response.status === 404) {
      throw new NotFoundError(
        "Feedback not found. The feedback may have been deleted or does not exist.",
      );
    }

    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks");
    }

    return response.json();
  },
};
