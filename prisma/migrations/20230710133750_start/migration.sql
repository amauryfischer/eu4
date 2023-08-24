-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('COLLECT_ASTEROIDS', 'RESEARCH', 'CONSTRUCT_SHIP', 'CONSTRUCT_BUILDING', 'COLLECT_RESOURCES', 'CONSTRUCT_MODULE');

-- CreateTable
CREATE TABLE "Asteroid" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "Asteroid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemPosition" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "z" INTEGER NOT NULL,
    "system" TEXT NOT NULL,

    CONSTRAINT "SystemPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resources" (
    "id" TEXT NOT NULL,
    "Titane" INTEGER NOT NULL,
    "Azote" INTEGER NOT NULL,
    "Aluminium" INTEGER NOT NULL,
    "Cuivre" INTEGER NOT NULL,
    "Fer" INTEGER NOT NULL,
    "Uranium" INTEGER NOT NULL,
    "Hydrogene" INTEGER NOT NULL,
    "Silicium" INTEGER NOT NULL,
    "asteroidId" TEXT,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "fleetId" TEXT,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleString" (
    "id" TEXT NOT NULL,
    "identifiant" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,

    CONSTRAINT "ModuleString_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "systemPositionId" TEXT NOT NULL,
    "resourcesId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pirate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "Pirate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Asteroid" ADD CONSTRAINT "Asteroid_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "SystemPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resources" ADD CONSTRAINT "Resources_asteroidId_fkey" FOREIGN KEY ("asteroidId") REFERENCES "Asteroid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "Fleet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleString" ADD CONSTRAINT "ModuleString_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_systemPositionId_fkey" FOREIGN KEY ("systemPositionId") REFERENCES "SystemPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pirate" ADD CONSTRAINT "Pirate_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "SystemPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "SystemPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
