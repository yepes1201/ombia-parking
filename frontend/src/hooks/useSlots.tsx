import { useQuery } from "@tanstack/react-query";

export const useSlots = () => {
  return useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/parking/slots`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch slots");
      }
      return response.json();
    },
  });
};
