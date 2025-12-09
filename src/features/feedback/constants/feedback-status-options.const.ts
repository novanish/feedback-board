import { FeedbackStatus } from "@/generated/prisma/enums";

export const FEEDBACK_STATUS_OPTIONS = [
  { label: "Open", value: FeedbackStatus.OPEN },
  { label: "In Progress", value: FeedbackStatus.IN_PROGRESS },
  { label: "Done", value: FeedbackStatus.DONE },
] as const;
