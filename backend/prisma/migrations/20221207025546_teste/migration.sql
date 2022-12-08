/*
  Warnings:

  - A unique constraint covering the columns `[numero_turma]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "aluno_turma" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_aluno_turma_key" ON "Aluno"("aluno_turma");

-- CreateIndex
CREATE UNIQUE INDEX "turmas_numero_turma_key" ON "turmas"("numero_turma");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_aluno_turma_fkey" FOREIGN KEY ("aluno_turma") REFERENCES "turmas"("numero_turma") ON DELETE RESTRICT ON UPDATE CASCADE;
