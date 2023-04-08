import express from 'express'
//controllers
import deletController from '../controllers/delete.js';

const router = express.Router();

router
    .delete('/room/:roomId', deletController.deleteRoomById)
    .delete('/message/:messageId', deletController.deleteMessageById)

    export default router;