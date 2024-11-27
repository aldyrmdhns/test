/*
  Warnings:

  - Changed the type of `departureTime` on the `departure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `arrivalTime` on the `departure` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "departure" DROP COLUMN "departureTime",
ADD COLUMN     "departureTime" TIMESTAMPTZ NOT NULL,
DROP COLUMN "arrivalTime",
ADD COLUMN     "arrivalTime" TIMESTAMPTZ NOT NULL;
