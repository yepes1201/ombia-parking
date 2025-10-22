import { useState } from "react";
import { useCars } from "./hooks/useCars";
import { useSlots } from "./hooks/useSlots";
import { usePark } from "./hooks/usePark";
import { ParkingSlot } from "./components/ParkingSlot";
import type { Slot, Car } from "./types/types";

function App() {
  const { data: slots, isLoading } = useSlots();
  const { data: cars, isLoading: carsLoading } = useCars();
  const { park, reset } = usePark();
  const [slotsToPark, setSlotsToPark] = useState<number[]>([]);

  const isPending = park.isPending || reset.isPending;

  const handleReset = () => {
    reset.mutate();
    setSlotsToPark([]);
  };

  const handlePark = () => {
    const waitingCars = slots?.filter(
      (slot: Slot) => slot.carWaitingId !== null
    );
    park.mutate({
      availableSlots: slotsToPark,
      carsToPark: waitingCars,
    });
    setSlotsToPark([]);
  };

  const handleSlotClick = (id: number) => {
    if (slotsToPark.includes(id)) {
      setSlotsToPark(slotsToPark.filter((slot) => slot !== id));
    } else {
      setSlotsToPark([...slotsToPark, id]);
    }
  };

  const clearSelectedSlots = () => {
    setSlotsToPark([]);
  };

  return (
    <section className="h-dvh w-full flexjustify-center">
      <header className="w-full flex items-center justify-center py-8 px-4">
        <h1 className="text-5xl font-bold text-center">OMBIA Parking</h1>
      </header>

      <div className="text-center font-medium w-fit mx-auto">
        <p>Los elementos de texto en blanco es el estacionamiento</p>
        <p className="animate-pulse">
          Los elementos de texto titilantes son los carros esperando
        </p>
        <p className="text-black bg-red-400">
          Los elementos de texto negro son los carros estacionados
        </p>
      </div>

      {isLoading || carsLoading ? (
        <div>
          <h1 className="text-2xl font-bold text-center">Loading...</h1>
        </div>
      ) : (
        <main className="w-fit mx-auto flex flex-col items-center justify-center py-8 px-4">
          <div className="flex items-center gap-2 mb-4"></div>
          <div className="flex">
            {slots
              .filter((slot: Slot) => slot.id >= 14)
              .reverse()
              .map((slot: Slot) => (
                <ParkingSlot
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  id={slot.id}
                  name={slot.name}
                  isSelected={slotsToPark.includes(slot.id)}
                  carParked={cars?.find(
                    (car: Car) => car.id === slot.carParkedId
                  )}
                  waitingCar={
                    cars?.find((car: Car) => car.id === slot.carWaitingId) ||
                    null
                  }
                />
              ))}
          </div>
          <div className="flex flex-col self-end">
            {slots
              .filter((slot: Slot) => slot.id >= 8 && slot.id <= 13)
              .reverse()
              .map((slot: Slot) => (
                <ParkingSlot
                  key={slot.id}
                  onClick={() => handleSlotClick(slot.id)}
                  id={slot.id}
                  name={slot.name}
                  isSelected={slotsToPark.includes(slot.id)}
                  carParked={cars?.find(
                    (car: Car) => car.id === slot.carParkedId
                  )}
                  waitingCar={
                    cars?.find((car: Car) => car.id === slot.carWaitingId) ||
                    null
                  }
                />
              ))}
          </div>
          <div className="flex">
            {slots
              .filter((slot: Slot) => slot.id >= 1 && slot.id <= 7)
              .map((slot: Slot) => (
                <ParkingSlot
                  key={slot.id}
                  id={slot.id}
                  name={slot.name}
                  onClick={() => handleSlotClick(slot.id)}
                  isSelected={slotsToPark.includes(slot.id)}
                  carParked={cars?.find(
                    (car: Car) => car.id === slot.carParkedId
                  )}
                  waitingCar={
                    cars?.find((car: Car) => car.id === slot.carWaitingId) ||
                    null
                  }
                />
              ))}
          </div>

          <div className="mt-8 flex gap-2">
            <button
              onClick={handlePark}
              disabled={isPending}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {isPending ? "Simulating..." : "Simulate Parking"}
            </button>
            <button
              onClick={handleReset}
              disabled={isPending}
              className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Reset Parking
            </button>
            <button
              onClick={clearSelectedSlots}
              disabled={isPending}
              className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {"Clear Selected Slots"}
            </button>
          </div>
        </main>
      )}
    </section>
  );
}

export default App;
