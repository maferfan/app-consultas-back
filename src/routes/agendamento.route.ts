import express, { Request, Response } from 'express';
import { agendamento, minhasConsultas, meusPacientes } from '../controllers/agendamentoController';

const router = express.Router();

// Rota para criar agendamento
router.post("/agendamento/:pacienteId/:medicoId", async (req: Request, res: Response) => {
  await agendamento(req, res);
});

// Rota para buscar consultas de um paciente
router.get("/minhasConsultas/:pacienteId", async (req: Request, res: Response) => {
  await minhasConsultas(req, res);
});

// Rota para buscar agendamentos de um médico
router.get("/meusAgendamentos/:medicoId", async (req: Request, res: Response) => {
  await meusPacientes(req, res);
});

export default router;
