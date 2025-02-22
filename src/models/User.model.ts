import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  type: 'Médico' | 'Paciente';
  cidade: string;
  estado: string;
  social?: string | null;
  descricao?: string | null;
  CRM?: string | null;
  especialidade?: string | null;
  fotoPerfil?: string | null;
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true, max: 100 },
  sobrenome: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 150 },
  senha: { type: String, required: true, max: 150 },
  confirmarSenha: { type: String, required: true, max: 150 },
  type: { type: String, enum: ['Médico', 'Paciente'], required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  social: { type: String, default: null },
  descricao: { type: String, default: null },
  CRM: { type: String, default: null },
  especialidade: { type: String, default: null },
  fotoPerfil: { type: String, default: null },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
