import express  from "express";

//controllers
import users from "../controllers/users.js";

//middlewares
import { encode } from '../middlewares/jwt.js'

const router = express.Router();

router.post('/login/:userId', encode, (req, res, next) => {
    return res.status(200).json({
        success: true,
        authorization: req.authToken,
    })
})

export default router;