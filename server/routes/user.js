import express  from "express";

//controllers
import users from '../controllers/users.js'

const router = express.Router()

router
    .get('/', users.getAllUsers)
    .post('/', users.createUser)
    .get('/:id', users.getUserById)
    .delete('/:id', users.deleteUserById)
    export default router;