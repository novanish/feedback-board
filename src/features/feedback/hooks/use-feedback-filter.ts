import { isValidStatus } from "@/features/feedback/utils/is-valid-status";
import { useSearchParams } from "next/navigation";

export function useFeedbackFilter() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return {
    status: isValidStatus(status) ? status : null,
  };
}
