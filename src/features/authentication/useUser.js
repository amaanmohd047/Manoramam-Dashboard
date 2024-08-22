import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    // refetchOnWindowFocus: false,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
