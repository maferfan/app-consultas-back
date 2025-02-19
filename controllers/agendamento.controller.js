const Agendamento = require("../models/Agendamento.model");

const agendamento = async function (req, res) {
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
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.json({ error: "Erro ao agendar." });
  }
};

const minhasConsultas = async function (req, res) {
  try {
    const { pacienteId } = req.params;

    const meusAgendamentos = await Agendamento.find({
      pacienteId: pacienteId,
    }).populate("medicoId", "nome sobrenome email especialidade").select("-pacienteId");

    res.status(200).json(meusAgendamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar consultas." });
  }
};

const meusPacientes = async function (req, res) {
    try {
      const { medicoId } = req.params;
      const meusAgendamentos = await Agendamento.find({
        medicoId: medicoId,
      }).populate("pacienteId", "nome sobrenome email ").select("-medicoId");;
  
      res.status(200).json(meusAgendamentos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar agendamentos." });
    }
  };

module.exports = { agendamento, minhasConsultas, meusPacientes };
