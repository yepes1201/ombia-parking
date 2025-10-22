import { useQuery } from "@tanstack/react-query";

export const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/parking/cars`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      return response.json();
    },
  });
};
