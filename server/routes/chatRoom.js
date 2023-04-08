import express from 'express'
//controllers
import chatRoom from '../controllers/chatRoom.js';

const router = express.Router();

router
    .get('/', chatRoom.getRecentConversation)
    .get('/:roomId', chatRoom.getConversationByRoomById)
    .post('/initiate', chatRoom.initiate)
    .post('/:roomId/message', chatRoom.postMessage)
    .put('/:roomId/mark-read', chatRoom.markConversationReadByRoomById)

    export default router;