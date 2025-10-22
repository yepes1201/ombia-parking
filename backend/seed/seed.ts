import { db } from '../src/db';
import { car, parking } from '../src/db/schema';

async function seed() {
  const existingCars = await db.select().from(car);
  if (existingCars.length === 0) {
    await db.insert(car).values([
      { name: 'Nissan GTR R34', color: 'Purple', plate: 'JDM-001' },
      { name: 'Toyota Supra', color: 'Red', plate: 'JDM-002' },
      { name: 'Mazda RX7', color: 'Yellow', plate: 'JDM-003' },
      { name: 'Nissan Silvia S15', color: 'White', plate: 'JDM-004' },
      { name: 'Toyota Camry', color: 'Blanco', plate: 'ABC-101' },
      { name: 'Honda Civic', color: 'Gris', plate: 'ABC-102' },
      { name: 'Ford Focus', color: 'Azul', plate: 'ABC-103' },
      { name: 'Chevrolet Malibu', color: 'Negro', plate: 'ABC-104' },
      { name: 'Nissan Altima', color: 'Rojo', plate: 'ABC-105' },
      { name: 'Hyundai Elantra', color: 'Plateado', plate: 'ABC-106' },
      { name: 'Kia Optima', color: 'Blanco', plate: 'ABC-107' },
      { name: 'Volkswagen Jetta', color: 'Gris', plate: 'ABC-108' },
      { name: 'Mazda 3', color: 'Azul', plate: 'ABC-109' },
      { name: 'Subaru Impreza', color: 'Negro', plate: 'ABC-110' },
      { name: 'BMW 3 Series', color: 'Rojo', plate: 'ABC-111' },
      { name: 'Mercedes C-Class', color: 'Plateado', plate: 'ABC-112' },
      { name: 'Audi A4', color: 'Blanco', plate: 'ABC-113' },
      { name: 'Lexus IS', color: 'Gris', plate: 'ABC-114' },
      { name: 'Infiniti Q50', color: 'Azul', plate: 'ABC-115' },
      { name: 'Acura TLX', color: 'Negro', plate: 'ABC-116' },
      { name: 'Genesis G70', color: 'Rojo', plate: 'ABC-117' },
      { name: 'Volvo S60', color: 'Plateado', plate: 'ABC-118' },
      { name: 'Jaguar XE', color: 'Blanco', plate: 'ABC-119' },
      { name: 'Cadillac CT4', color: 'Gris', plate: 'ABC-120' },
    ]);
  }

  const existingParkings = await db.select().from(parking);
  if (existingParkings.length === 0) {
    await db.insert(parking).values([
      { name: 'N101', carParkedId: 1, carWaitingId: null },
      { name: 'N102', carParkedId: 2, carWaitingId: 21 },
      { name: 'N103', carParkedId: 3, carWaitingId: null },
      { name: 'N104', carParkedId: 4, carWaitingId: null },
      { name: 'N105', carParkedId: 5, carWaitingId: 22 },
      { name: 'N106', carParkedId: 6, carWaitingId: null },
      { name: 'N107', carParkedId: 7, carWaitingId: null },
      { name: 'N108', carParkedId: 8, carWaitingId: null },
      { name: 'N109', carParkedId: 9, carWaitingId: null },
      { name: 'N110', carParkedId: 10, carWaitingId: null },
      { name: 'N111', carParkedId: 11, carWaitingId: 23 },
      { name: 'N112', carParkedId: 12, carWaitingId: null },
      { name: 'N113', carParkedId: 13, carWaitingId: null },
      { name: 'N114', carParkedId: 14, carWaitingId: null },
      { name: 'N115', carParkedId: 15, carWaitingId: null },
      { name: 'N116', carParkedId: 16, carWaitingId: null },
      { name: 'N117', carParkedId: 17, carWaitingId: 24 },
      { name: 'N118', carParkedId: 18, carWaitingId: null },
      { name: 'N119', carParkedId: 19, carWaitingId: null },
      { name: 'N120', carParkedId: 20, carWaitingId: null },
    ]);
  }
}

seed().catch((err) => {
  console.error('Error al crear los datos:', err);
  process.exit(1);
});
