import { createContact, deleteOneContact, getContacts, getOneContact, updateContact } from "../models/contactModel.js";

export const createNewContact = async (req, res) => {
  const { name, lastname, number } = req.body;

  if (!name || !lastname || !number) return res.status(400).send({ message: 'Dados não enviados' })

  const errors = [];

  if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres');
  if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres');
  if (!req.session.user.user_id) errors.push('Erro ao referenciar contato')

  if (errors.length) {
    return res.status(400).send({ errors });
  }

  const data = {
    name,
    lastname,
    number,
    user_id: req.session.user.user_id
  }

  const contact = await createContact(data);

  if (!contact) return res.status(500).send({ message: 'Erro ao criar contato' });

  res.send({ message: 'Contato criado com sucesso' });
}

export const getAllContacts = async (req, res) => {
  const id = req.session.user.user_id;

  if (!id) return null;

  const results = await getContacts(id);

  if (results === null) res.send({ message: 'Erro ao buscar contatos' }).status(500);

  res.send(results).status(200);
}

export const getContact = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.send({ message: 'Dados faltando' }).status(400);

  const result = await getOneContact(id);

  if (!result) {
    res.send({ message: 'Contato não encontrado' }).status(400)
  } else {
    res.send({ contact: result });
  }
}

export const editContact = async (req, res) => {
  const { name, lastname, number, contactId } = req.body;

  console.log(name, lastname, number, contactId);

  if (!name || !lastname || !number || !contactId) return res.status(400).send({ message: 'Dados não enviados' })

  const errors = [];

  if (name.length < 3) errors.push('Nome deve ser maior ou igual a 3 caracteres');
  if (lastname.length < 3) errors.push('Sobrenome deve ser maior ou igual a 3 caracteres');
  if (!req.session.user.user_id) errors.push('Erro ao referenciar contato')

  if (errors.length) {
    return res.status(400).send({ errors });
  }

  const data = {
    name,
    lastname,
    number,
  }

  const contact = await updateContact(data, contactId);

  if (!contact) return res.status(500).send({ message: 'Erro ao editar contato' });

  res.send({ message: 'Contato editado com sucesso' });
}

export const deleteContact = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.send({ message: 'Erro ao excluir contato' }).status(400);

  const deletedContact = deleteOneContact(id);

  if (!deletedContact) return res.send({ message: 'Não foi possível excluir o contato' }).status(500);

  res.send({message: 'Contato exluído'});
}