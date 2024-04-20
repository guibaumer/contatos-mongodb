import validator from "validator";
import bcrypt from 'bcrypt';
import { createUser, deleteTheUser, emailUtilized } from "../models/userModels.js";

export const createNewUser = async (req, res) => {
  const { name, email, password} = req.body;

  const errors = [];

    if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres.');
    if (!(validator.isEmail(email))) errors.push('Email inválido.');

    if (await emailUtilized(email)) errors.push('Email já utilizado.');

    if (password.length < 8) errors.push('Senha precisa ter pelo menos 8 caracteres.');
    if (req.session.user) errors.push('Saia de sua conta para poder criar um novo usuário');

    if (errors.length) {
      return res.status(400).send({errors: errors});
    }

    const password_hash = await bcrypt.hash(password, 10);

    if(!password_hash) return res.status(500).send({message: 'Erro: tente novamente mais tarde'});

    const newUser = {
      name,
      email,
      password_hash,
    }

    const user = await createUser(newUser);

    if (!user) return res.status(500).send({ message: 'Erro ao criar usuário' });

    try {
      req.session.user = {
          user_id: user._id,
          username: user.name,
      };
  } catch (err) {
      console.log('ERRO DA SESSÃO: ' + err);
      return res.send({message: 'Erro na sessão'}).status(500);
  }

    res.send({message: 'Usuário criado', user: user});
}

export const deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.send({message: 'Problema ao deletar usuário'}).status(400);

  const deletedUser = await deleteTheUser(userId);


  if (deleteTheUser) {
    if (req.session && req.session.user) await req.session.destroy();
    console.log(deleteTheUser);
    res.send({message: 'Conta deletada com sucesso', user: deletedUser});
  } else {
    res.send({message: 'Erro ao deletar usuário'}).status(500);
  }
}

