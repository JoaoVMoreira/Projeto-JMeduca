/*
  Warnings:

  - You are about to drop the column `numero_turma` on the `turmas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[turma]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serie]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[turma,serie]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `turma` to the `turmas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_aluno_turma_aluno_serie_fkey";

-- DropIndex
DROP INDEX "aluno_aluno_turma_aluno_serie_key";

-- DropIndex
DROP INDEX "turmas_numero_turma_serie_key";

-- AlterTable
ALTER TABLE "turmas" DROP COLUMN "numero_turma",
ADD COLUMN     "turma" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "turmas_turma_key" ON "turmas"("turma");

-- CreateIndex
CREATE UNIQUE INDEX "turmas_serie_key" ON "turmas"("serie");

-- CreateIndex
CREATE UNIQUE INDEX "turmas_turma_serie_key" ON "turmas"("turma", "serie");

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_aluno_turma_aluno_serie_fkey" FOREIGN KEY ("aluno_turma", "aluno_serie") REFERENCES "turmas"("turma", "serie") ON DELETE RESTRICT ON UPDATE CASCADE;
