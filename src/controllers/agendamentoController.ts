import { Request, Response } from "express";
import Agendamento from "../models/Agendamento.model";

const agendamento = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { pacienteId, medicoId } = req.params;
    const { data, hora, status } = req.body;

    const novoAgendamento = await Agendamento.create({
      pacienteId,
      medicoId,
      data,
      hora,
      status,
    });

    return res.status(201).json(novoAgendamento);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao agendar." });
  }
};

const minhasConsultas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { pacienteId } = req.params;

    const meusAgendamentos = await Agendamento.find({ pacienteId })
      .populate("medicoId", "nome sobrenome email especialidade")
      .select("-pacienteId");

    return res.status(200).json(meusAgendamentos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar consultas." });
  }
};

const meusPacientes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { medicoId } = req.params;

    const meusAgendamentos = await Agendamento.find({ medicoId })
      .populate("pacienteId", "nome sobrenome email")
      .select("-medicoId");

    return res.status(200).json(meusAgendamentos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar agendamentos." });
  }
};

export { agendamento, minhasConsultas, meusPacientes };
