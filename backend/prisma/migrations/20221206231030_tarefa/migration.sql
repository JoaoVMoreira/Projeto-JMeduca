/*
  Warnings:

  - Changed the type of `numero_turma` on the `turmas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "turmas" DROP COLUMN "numero_turma",
ADD COLUMN     "numero_turma" INTEGER NOT NULL;
