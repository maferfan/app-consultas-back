const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let UserSchema = new Schema({
  nome: { type: String, required: true, max: 100 },
  sobrenome: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 150 },
  senha:{ type: String, required: true, max: 150 },
  confirmarSenha:{ type: String, required: true, max: 150 },
  type: { type: String, enum: ["Médico", "Paciente"], required: true },
  descricao: { type: String, default: null },
  CRM: { type: String, default: null },
  especialidade: { type: String, default: null },
  fotoPerfil: { type: String, require: false, default: null  }
});

module.exports = mongoose.model("User", UserSchema);
