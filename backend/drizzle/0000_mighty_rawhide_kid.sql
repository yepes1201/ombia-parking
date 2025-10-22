CREATE TABLE "car" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"plate" text,
	CONSTRAINT "car_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
CREATE TABLE "parking" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"car_parked_id" bigint,
	"car_waiting_id" bigint
);
--> statement-breakpoint
ALTER TABLE "parking" ADD CONSTRAINT "parking_car_parked_id_car_id_fk" FOREIGN KEY ("car_parked_id") REFERENCES "public"."car"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parking" ADD CONSTRAINT "parking_car_waiting_id_car_id_fk" FOREIGN KEY ("car_waiting_id") REFERENCES "public"."car"("id") ON DELETE set null ON UPDATE no action;