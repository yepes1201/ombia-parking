import { Injectable, Inject } from '@nestjs/common';
import { db, DB_TOKEN } from '../db';
import { car, parking } from '../db/schema';
import { asc, eq } from 'drizzle-orm';
import { ParkCarDto } from './parking.controller';

@Injectable()
export class ParkingService {
  constructor(@Inject(DB_TOKEN) private database: typeof db) {}

  async getAllCars() {
    return await this.database.select().from(car);
  }

  async getAllParkingSlots() {
    return await this.database.select().from(parking).orderBy(asc(parking.id));
  }

  async getCarById(id: number) {
    return await this.database
      .select()
      .from(car)
      .where(eq(car.id, id))
      .orderBy(asc(car.id));
  }

  async parkCars(
    availableSlots: ParkCarDto['availableSlots'],
    carsToPark: ParkCarDto['carsToPark'],
  ) {
    let currentCarsToPark = [...carsToPark];

    for (const slot of availableSlots) {
      const lowersCarsSlot = currentCarsToPark.filter(
        (s) => s.id <= slot && s.carWaitingId !== null,
      );

      let closestSlotCar: (typeof currentCarsToPark)[0] | undefined;
      let closestSlotId: number;

      if (lowersCarsSlot.length > 0) {
        closestSlotId = Math.max(...lowersCarsSlot.map((s) => s.id));
        closestSlotCar = lowersCarsSlot.find((s) => s.id === closestSlotId);
      } else {
        const carsWithWaiting = currentCarsToPark.filter(
          (c) => c.carWaitingId !== null,
        );
        if (carsWithWaiting.length === 0) {
          return {
            message: 'No hay carros esperando',
          };
        }
        closestSlotId = Math.max(...carsWithWaiting.map((s) => s.id));
        closestSlotCar = carsWithWaiting.find((s) => s.id === closestSlotId);
      }

      if (!closestSlotCar?.carWaitingId) {
        return {
          message: 'No se encontró carro más cercano',
        };
      }

      let placesToMove: number;
      if (slot >= closestSlotId) {
        placesToMove = slot - closestSlotId;
      } else {
        placesToMove = slot + 20 - closestSlotId;
      }

      const movementPromises = currentCarsToPark
        .filter((c) => c.carWaitingId !== null)
        .map(async (c) => {
          if (c.id === closestSlotId) {
            return null;
          }

          const carId = c.carWaitingId;
          let newSlotId = c.id + placesToMove;
          if (newSlotId > 20) {
            newSlotId = newSlotId - 20;
          }

          // Primero limpiar el slot actual
          await this.database
            .update(parking)
            .set({ carWaitingId: null })
            .where(eq(parking.id, c.id))
            .execute();

          // Luego colocar en el nuevo slot
          await this.database
            .update(parking)
            .set({ carWaitingId: carId })
            .where(eq(parking.id, newSlotId))
            .execute();

          return { ...c, id: newSlotId };
        });

      const movedCars = (await Promise.all(movementPromises)).filter(
        (c) => c !== null,
      );

      await Promise.all([
        // Parquear el carro
        this.database
          .update(parking)
          .set({ carParkedId: closestSlotCar.carWaitingId })
          .where(eq(parking.id, slot))
          .execute(),

        // Limpiar el slot donde estaba esperando
        this.database
          .update(parking)
          .set({ carWaitingId: null })
          .where(eq(parking.id, closestSlotId))
          .execute(),
      ]);

      currentCarsToPark = [
        ...movedCars,
        ...currentCarsToPark.filter((c) => c.carWaitingId === null),
      ];
    }

    return {
      availableSlots,
      carsToPark: currentCarsToPark,
    };
  }

  async resetParking() {
    await this.database
      .update(parking)
      .set({
        carParkedId: null,
        carWaitingId: null,
      })
      .execute();

    const allSlots = await this.database
      .select()
      .from(parking)
      .orderBy(asc(parking.id));

    const allCars = await this.database.select().from(car).orderBy(asc(car.id));

    for (let i = 0; i < 20 && i < allSlots.length; i++) {
      const slot = allSlots[i];
      const car = allCars[i];

      await this.database
        .update(parking)
        .set({ carParkedId: car.id })
        .where(eq(parking.id, slot.id))
        .execute();
    }

    const waitingSlots = [2, 5, 11, 17];
    const waitingCars = allCars.slice(20, 24);

    for (let i = 0; i < waitingSlots.length; i++) {
      const slotId = waitingSlots[i];
      const car = waitingCars[i];

      if (car) {
        await this.database
          .update(parking)
          .set({ carWaitingId: car.id })
          .where(eq(parking.id, slotId))
          .execute();
      }
    }

    return { message: 'Parking reseteado' };
  }
}
