-- CreateTable
CREATE TABLE "departure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departureTime" TIME NOT NULL,
    "arrivalTime" TIME NOT NULL,

    CONSTRAINT "departure_pkey" PRIMARY KEY ("id")
);
