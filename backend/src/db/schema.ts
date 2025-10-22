import { bigserial, bigint, pgTable, text } from 'drizzle-orm/pg-core';

export const car = pgTable('car', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  color: text('color'),
  plate: text('plate').unique(),
});

export const parking = pgTable('parking', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  carParkedId: bigint('car_parked_id', { mode: 'number' }).references(
    () => car.id,
    { onDelete: 'set null' },
  ),
  carWaitingId: bigint('car_waiting_id', { mode: 'number' }).references(
    () => car.id,
    { onDelete: 'set null' },
  ),
});
