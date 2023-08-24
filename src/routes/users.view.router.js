import { Router } from 'express';
import { passportCall, authenticate } from '../utils.js';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.put('/:userId', passportCall, authenticate('admin'), UserController.update);

router.get('/current', passportCall, authenticate('admin'), UserController.current);

// Ruta para obtener y mostrar la lista de usuarios
router.get('/', passportCall, authenticate('admin'), async (req, res) => {
    try {
        // Obtén la lista de usuarios
        const users = await UserController.getAll();

        // Renderiza la vista 'users.handlebars' y pasa los datos de los usuarios
        res.render('users', { users });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener la lista de usuarios.' });
    }
});

// Ruta para eliminar usuarios inactivos
router.delete('/', passportCall, authenticate('admin'), async (req, res) => {
    try {
        // Llama a la función para eliminar usuarios inactivos
        const result = await UserController.deleteUsersInactives();

        if (result) {
            res.status(200).json({ message: 'Usuarios inactivos eliminados exitosamente.' });
        } else {
            res.status(500).json({ message: 'Error al eliminar usuarios inactivos.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar usuarios inactivos.' });
    }
});

export default router;
