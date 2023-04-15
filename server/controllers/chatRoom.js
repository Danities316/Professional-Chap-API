import makeValidation from "@withvoid/make-validation"
import chatRoomModel, {CHAT_ROOM_TYPES} from "../model/chatRoom.js"

export default {
    initiate: async (req, res) => {
        try {
            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    userIds: {
                        type: types.array,
                        options: { unique: true, empty: false, stringOnly: true},
                    },
                    type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES}}
                }
            }));
            if(!validation){
                return res.status(400).json({ ...validation })
            }
            //coming from the frontend
            const { userIds, type } = req.body
            //coming from the decode middleware, using the ID of the current loggedin user
            const { userId: chatInitiotor } = req

            const allUserIds = [...userIds, chatInitiotor]
            const chatRoom = await chatRoomModel.initiateChat(allUserIds, type, chatInitiotor);
            return res.status(200).json({
                success: true,
                chatRoom
            })
        } catch (error) {
            return res.status(500).json({
                success:  false,
                error: error
            })
            
        }
    },
    postMessage: async (req, res) => {consol.log(req.body)},
    getRecentConversation: async (req, res) => {consol.log(req.body)},
    getConversationByRoomById: async (req, res) => {consol.log(req.body)},
    markConversationReadByRoomById: async (req, res) => {consol.log(req.body)},
}