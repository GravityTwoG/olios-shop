-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('CONTENT_MANAGER', 'MANAGER');

-- CreateTable
CREATE TABLE "InviteCode" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL,
    "usedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteCode_code_key" ON "InviteCode"("code");
