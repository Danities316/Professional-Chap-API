import express  from "express";

//controllers
import users from '../controllers/users.js'

//middlewares
import { encode } from '../middlewares/jwt.js'

const router = express.Router()

router
    .post('/login/:userId', encode, (req, res) => {

    })

    export default router;