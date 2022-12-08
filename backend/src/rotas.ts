import { Router } from "express";
import { deleteAlunosController } from "./controller/aluno/deleteAlunosController";
import { getAlunosController } from "./controller/aluno/getAlunosController";
import { postAlunosController } from "./controller/aluno/postAlunosController";
import { updateAlunosController } from "./controller/aluno/updateAlunosController";
import { getMateriasController } from "./controller/materia/getMateriasController";
import { postMateriasController } from "./controller/materia/postMateriasController";
import { getTurmasController } from "./controller/turma/getTurmasController";
import { postTurmaController } from "./controller/turma/postTurmaController";

const rota = Router()

//TURMAS
rota.post('/turmas', new postTurmaController().handle)
rota.get('/turmas', new getTurmasController().handle)

//ALUNOS
rota.post('/alunos', new postAlunosController().handle)
rota.get('/alunos', new getAlunosController().handle)
rota.delete('/alunos/remove', new deleteAlunosController().handle)
rota.put('/alunos/update', new updateAlunosController().handle)

//MATERIAS
rota.post('/materias', new postMateriasController().handle)
rota.get('/materias', new getMateriasController().handle)

export {rota}