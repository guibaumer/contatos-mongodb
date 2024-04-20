import { Router } from 'express';
import { createNewUser, deleteUser } from '../controllers/userController.js';
import { logUser, checkSession, logOut } from '../controllers/loginController.js';
const router = new Router();

router.get('/session', checkSession);
router.post('/', createNewUser);
router.post('/login', logUser);
router.post('/logout', logOut);
router.delete('/delete', deleteUser)

export default router;

