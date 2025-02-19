const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async function (req, res) {
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
      fotoPerfil: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário." });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email não existente." });
    }

    const isPasswordExists = await bcrypt.compare(senha, user.senha);

    if (!isPasswordExists) {
      return res.status(400).json({ error: "Senha inválida." });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    return res.status(201).json({ auth: true, token: token });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao acessar a conta." });
  }
};

const users = async function (req, res) {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar entidades." });
  }
};

const consultarMedico = async function (req, res) {
  try {
    const { nome, especialidade } = req.query;
    const filtro = { type: "Médico" };

    if (nome) filtro.nome = { $regex: new RegExp(nome, "i") };;
    if (especialidade) filtro.especialidade = { $regex: new RegExp(especialidade, "i") };;
    const getDoc = await User.find(filtro);

    res.status(200).json(getDoc);
  } catch (error) {
    consoler.log(error);
    res.status(500).json({ error: "Erro ao encontrar este médico." });
  }
};

const deleteUser = async function (req, res) {
  try {
    const { _id } = req.params;
    await User.deleteOne({ _id });
    if (!_id) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar o usuário." });
  }
};

const bemVindo = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ message: `Bem-vindo, ${user.nome}!` });
};
module.exports = {
  register,
  users,
  login,
  deleteUser,
  bemVindo,
  consultarMedico,
};
