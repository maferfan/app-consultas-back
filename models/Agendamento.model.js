const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AgendamentoSchema = new Schema({
  pacienteId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  medicoId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  data:{ type: String, required: true },
  hora: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendente", "confirmado", "cancelado"],
    default: "pendente",
  },
});

module.exports = mongoose.model("Agendamento", AgendamentoSchema);
