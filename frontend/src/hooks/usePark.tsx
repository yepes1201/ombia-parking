import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ParkCarDto {
  availableSlots: number[];
  carsToPark:
    | {
        id: number;
        name: string;
        carParkedId: number | null;
        carWaitingId: number | null;
      }[]
    | undefined;
}

export const usePark = () => {
  const queryClient = useQueryClient();
  const mPark = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    mutationFn: async (data: ParkCarDto) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/parking/park`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to park cars");
      }
      return response.json();
    },
  });

  const mReset = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["slots"] });
    },
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/parking/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reset parking");
      }
      return response.json();
    },
  });

  return {
    park: mPark,
    reset: mReset,
  };
};
