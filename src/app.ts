import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';
import agendamentoRoutes from './routes/agendamento.route';
import db from './database/db';

const app = express();

// Configuração do dotenv e conexão com o banco de dados
dotenv.config();
db();

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.use(userRoutes);
app.use(agendamentoRoutes);

// Configuração do CORS
app.use(cors({
  origin: "http://localhost:8081",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Inicia o servidor
app.listen(8082, () => {
  console.log("Servidor rodando na porta 8082.");
});
