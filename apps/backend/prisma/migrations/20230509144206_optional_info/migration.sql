-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "patronymic" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL;
