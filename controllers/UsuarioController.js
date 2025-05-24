const Usuario = require('../models/Usuario');

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.criar(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.buscarPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};