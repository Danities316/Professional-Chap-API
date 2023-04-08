import express  from "express";

//controllers
import user from '../controllers/users.js'

const router = express.Router()

router
    .get('/', user.getAllUsers)
    .post('/', user.createUser)
    .get('/:id', user.getUserById)
    .delete('/:id', user.deleteUserById)
    export default router;