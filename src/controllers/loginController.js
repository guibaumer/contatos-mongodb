import { findUser } from "../models/userModels.js";
import bcrypt from 'bcrypt';

export const logUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ message: 'Dados faltando ' })

  const user = await findUser(email);

  console.log(user);

  if (!user) return res.status(400).send({ message: 'Usuário não existe' });

  const { password_hash } = user;

  if (req.session && req.session.user) {
    return res.status(400).send({ message: 'Saia de sua conta para poder logar outro perfil' })
  }

  const validPassword = await bcrypt.compare(password, password_hash);

  if (!validPassword) return res.status(401).send({ message: 'Senha incorreta' });

  try {
    req.session.user = {
      user_id: user._id,
      username: user.name,
    };
  } catch (err) {
    console.log('ERRO DA SESSÃO: ' + err);
    return res.send({ message: 'Erro na sessão' }).status(500);
  }

  res.send({ message: 'Logado', user: user });
}

export const checkSession = async (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.status(401).send({ isLoggedIn: false });
  }
}

export const logOut = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send({ message: 'Usuário não está logado.' });
  }

  try {
    await req.session.destroy();
    res.send({ message: 'Você saiu' });
  } catch (err) {
    res.status(500).send({ message: 'Erro ao deslogar' });
  }
}