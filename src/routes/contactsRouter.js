import { Router } from 'express';
import { createNewContact, getAllContacts, getContact, editContact, deleteContact } from '../controllers/contactsController.js';
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = new Router();

router.get('/', isAuthenticated, getAllContacts);
router.post('/', isAuthenticated, createNewContact);
router.put('/', isAuthenticated, editContact);
router.post('/find', isAuthenticated, getContact);
router.delete('/delete', isAuthenticated, deleteContact);

export default router;

