const express = require('express')
const app = express()
var cors = require('cors')
const dotenv = require('dotenv')
const user = require('./routes/user.route')
const agendamento = require('./routes/agendamento.route')
const db = require('./database/db')

//DB-ENV
dotenv.config()
db()

//API
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(user)
app.use(agendamento)
app.use(cors({
  origin: "http://localhost:8081",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));


app.listen(8082, () => {
  console.log("Servidor rodando em porta 8082.");
});
