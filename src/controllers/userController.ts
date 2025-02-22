import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import User from "../models/User.model";



const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      nome,
      sobrenome,
      CRM,
      senha,
      confirmarSenha,
      type,
      descricao,
      email,
      especialidade, 
      estado,
      cidade,
      social
    } = req.body;

    if (senha !== confirmarSenha) {
      return res.status(400).json({ message: "As senhas não coincidem." });
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ message: "Email existente." });
    }
    
    const passwordHash = await bcrypt.hash(senha, 10);

    const user = new User({
      nome,
      sobrenome,
      CRM,
      senha: passwordHash,
      confirmarSenha: passwordHash,
      type,
      descricao,
      email,
      especialidade,
      estado,
      cidade,
      social,
      fotoPerfil: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await user.save();
    return res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email não existente." });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha inválida." });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ auth: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao acessar a conta." });
  }
};

const users = async (req: Request, res: Response): Promise<Response> => {
  try {
    const usersList = await User.find({});
    return res.status(200).json(usersList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

const verificarImagem = (url: string) => {
  const imagePath = path.join(__dirname, "../uploads", url);
  if (fs.existsSync(imagePath)) {
    return url;
  }
  return null;
};

const consultarMedico = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nome, especialidade } = req.query;
    const filtro: { [key: string]: any } = { type: "Médico" };
    
    if (nome) filtro.nome = { $regex: new RegExp(nome as string, "i") };
    if (especialidade) filtro.especialidade = { $regex: new RegExp(especialidade as string, "i") };
    
    const medicos = await User.find(filtro).select("-senha -confirmarSenha");
    
    medicos.forEach((medico) => {
      if (medico.fotoPerfil) {
        const fotoPerfilUrl = verificarImagem(medico.fotoPerfil.slice(8));
        medico.fotoPerfil = fotoPerfilUrl ?? ""
      } 
    });
    
    return res.status(200).json(medicos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao encontrar médico." });
  }
};

const medicosEspecialidades = async (req: Request, res: Response): Promise<Response> => {
  try {
    const especialidades = await User.distinct("especialidade");
    const result = especialidades.map((especialidade, index) => ({
      id: index + 1, 
      nome: especialidade
    }));
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar especialidades." });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { _id } = req.params;
    
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await User.deleteOne({ _id });
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};

const bemVindo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {_id} = req.params
    const user = await User.findById(_id);
    return res.json({ message: `Bem-vindo, ${user?.nome}!` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao acessar dados do usuário." });
  }
};

export {
  register,
  users,
  login,
  deleteUser,
  bemVindo,
  consultarMedico,
  medicosEspecialidades
};
