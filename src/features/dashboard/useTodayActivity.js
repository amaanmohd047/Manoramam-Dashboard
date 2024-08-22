import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading: isLoadingTodayActivity, data: todayActivity } = useQuery({
    queryKey: ["today-activity"],
    queryFn: () => getStaysTodayActivity(),
  });

  return { isLoadingTodayActivity, todayActivity };
}
