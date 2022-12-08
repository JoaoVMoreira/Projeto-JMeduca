/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[numero_turma,serie]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_aluno_turma_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropIndex
DROP INDEX "turmas_numero_turma_key";

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "aluno_turma" INTEGER NOT NULL,
    "aluno_serie" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "n1" DOUBLE PRECISION NOT NULL,
    "n2" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_aluno_turma_aluno_serie_key" ON "aluno"("aluno_turma", "aluno_serie");

-- CreateIndex
CREATE UNIQUE INDEX "turmas_numero_turma_serie_key" ON "turmas"("numero_turma", "serie");

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_aluno_turma_aluno_serie_fkey" FOREIGN KEY ("aluno_turma", "aluno_serie") REFERENCES "turmas"("numero_turma", "serie") ON DELETE RESTRICT ON UPDATE CASCADE;
