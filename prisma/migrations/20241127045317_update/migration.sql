-- AlterTable
ALTER TABLE "departure" ALTER COLUMN "departureTime" SET DATA TYPE TIMESTAMPTZ(2),
ALTER COLUMN "arrivalTime" SET DATA TYPE TIMESTAMPTZ(2);
