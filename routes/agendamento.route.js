const express = require("express");
const router = express.Router();
const {agendamento, minhasConsultas, meusPacientes} = require('../controllers/agendamento.controller')


router.post("/agendamento/:pacienteId/:medicoId", agendamento)
router.get("/minhasConsultas/:pacienteId", minhasConsultas)
router.get("/meusAgendamentos/:medicoId", meusPacientes)

module.exports = router;