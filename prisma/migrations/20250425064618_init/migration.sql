/*
  Warnings:

  - You are about to drop the `Diagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SymptomOnDisease` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_predictedDiseaseId_fkey";

-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_userId_fkey";

-- DropForeignKey
ALTER TABLE "SymptomOnDisease" DROP CONSTRAINT "SymptomOnDisease_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "SymptomOnDisease" DROP CONSTRAINT "SymptomOnDisease_symptomId_fkey";

-- DropTable
DROP TABLE "Diagnosis";

-- DropTable
DROP TABLE "Disease";

-- DropTable
DROP TABLE "SymptomOnDisease";

-- CreateTable
CREATE TABLE "SymptomChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userInput" TEXT NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "possibleCondition" TEXT NOT NULL,
    "recommendations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SymptomChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomChatSymptom" (
    "symptomId" TEXT NOT NULL,
    "symptomChatId" TEXT NOT NULL,

    CONSTRAINT "SymptomChatSymptom_pkey" PRIMARY KEY ("symptomId","symptomChatId")
);

-- AddForeignKey
ALTER TABLE "SymptomChat" ADD CONSTRAINT "SymptomChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomChatSymptom" ADD CONSTRAINT "SymptomChatSymptom_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SymptomChatSymptom" ADD CONSTRAINT "SymptomChatSymptom_symptomChatId_fkey" FOREIGN KEY ("symptomChatId") REFERENCES "SymptomChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
