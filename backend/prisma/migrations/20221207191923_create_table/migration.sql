/*
  Warnings:

  - You are about to drop the column `materia` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `n1` on the `aluno` table. All the data in the column will be lost.
  - You are about to drop the column `n2` on the `aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "materia",
DROP COLUMN "n1",
DROP COLUMN "n2";

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "aluno_id" TEXT NOT NULL,
    "n1" DOUBLE PRECISION NOT NULL,
    "n2" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "materias" ADD CONSTRAINT "materias_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
