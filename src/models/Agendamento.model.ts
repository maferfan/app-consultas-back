import mongoose, { Document, Schema } from 'mongoose';

interface IAgendamento extends Document {
  pacienteId: mongoose.Types.ObjectId;
  medicoId: mongoose.Types.ObjectId;
  data: string;
  hora: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
}

const AgendamentoSchema: Schema = new Schema({
  pacienteId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  medicoId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  status: {
    type: String,
    enum: ["pendente", "confirmado", "cancelado"],
    default: "pendente",
  },
});

const Agendamento = mongoose.model<IAgendamento>('Agendamento', AgendamentoSchema);

export default Agendamento;
