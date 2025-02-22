import express, { Request, Response } from 'express';
import upload from '../middleware/multer';
import { register, users, login, deleteUser, bemVindo, consultarMedico, medicosEspecialidades } from '../controllers/userController';
import { authenticateToken } from '../middleware/token';

const router = express.Router();

// Rota para buscar todos os usuários
router.get("/user", async (req: Request, res: Response) => {
  await users(req, res);
});

// Rota para buscar médicos
router.get("/medico", async (req: Request, res: Response) => {
  await consultarMedico(req, res);
});

// Rota para buscar médicos por especialidade
router.get("/medicoEspecialidades", async (req: Request, res: Response) => {
  await medicosEspecialidades(req, res);
});

// Rota de boas-vindas com autenticação do token
router.get("/bemVindo", authenticateToken, async (req: Request, res: Response) => {
  await bemVindo(req, res);
});

// Rota para login
router.post("/login", async (req: Request, res: Response) => {
  await login(req, res);
});

// Rota para registrar um novo usuário com upload de foto de perfil
router.post("/user", upload.single("fotoPerfil"), async (req: Request, res: Response) => {
  await register(req, res);
});

// Rota para excluir um usuário pelo ID
router.delete("/user/:_id", async (req: Request, res: Response) => {
  await deleteUser(req, res);
});

export default router;
