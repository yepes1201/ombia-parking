export interface ParkingSlotProps {
  id: number;
  name: string;
  carParked?: Car | null;
  waitingCar?: WaitingCar | null;
  onClick?: () => void;
  isSelected?: boolean;
}

export interface Car {
  id: number;
  name: string;
  color: string;
  plate: string;
}

export interface WaitingCar extends Car {
  slot: number;
}

export interface Slot {
  id: number;
  name: string;
  carParkedId: number | null;
  carWaitingId: number | null;
}
