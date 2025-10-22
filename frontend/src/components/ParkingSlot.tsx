import type { ParkingSlotProps } from "../types/types";

export const ParkingSlot = ({
  name,
  onClick = () => {},
  carParked = null,
  waitingCar = null,
  isSelected = false,
}: ParkingSlotProps) => {
  const getTooltipContent = () => {
    if (carParked) {
      return (
        <div className="text-left">
          <div className="font-bold mb-1">Auto estacionado:</div>
          <div>Nombre: {carParked.name}</div>
          <div>Color: {carParked.color}</div>
          <div>Placa: {carParked.plate}</div>
        </div>
      );
    }
    return "Espacio disponible";
  };

  return (
    <div className="relative group">
      <div
        onClick={onClick}
        className={`flex flex-col w-20 h-20 border relative  items-center justify-center rounded-md cursor-pointer ${
          !carParked ? "bg-green-500 text-white" : "bg-red-400 text-white"
        } ${isSelected ? "border-4 border-blue-500" : ""}`}
      >
        {waitingCar && (
          <span className="text-xs font-bold text-white/70 text-center animate-pulse">
            {waitingCar.name}
          </span>
        )}
        <span className="text-sm font-bold">{name}</span>
        {carParked && (
          <span className="text-xs font-bold text-black text-center">
            {carParked.name.split(" ")[0]}
          </span>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10 pointer-events-none shadow-lg">
        {getTooltipContent()}
        {/* Flecha del tooltip apuntando hacia abajo */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-800"></div>
      </div>
    </div>
  );
};
