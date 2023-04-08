import express from 'express'
//controllers
import chatRoom from '../controllers/chatRoom.js';

const router = express.Router();

router
    .get('/', chatRoom.getRecentConvasation)
    .get('/:roomId', chatRoom.getConvasationById)
    .post('/initiate', chatRoom.initiate)
    .post('/:roomId/message', chatRoom.postMessage)
    .put('/:roomId/mark-read', chatRoom.markConvasationReadById)

    export default router;