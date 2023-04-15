import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CHAT_ROOM_TYPES = {
    CONSUMER_TO_CONSUMER: "consumer-to-consumer",
    CONSUMER_TO_SUPPORT:  "consumer-to-support",
};

const chatRoomSchema = new mongoose.Schema (
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, "")
        },
        userIds: Array,
        type: String,
        chatInitiator: String,
    },
    {
        timestamps: true,
        collection: 'chatrooms',
    }

);

chatRoomSchema.statics.initiateChat = async function(
    userIds, type, chatInitiator
){
    try {
        const availableRoom = await this.findOne({
            userIds: {
                //operator matches any array with the number of elements specified by the argument
                $size: userIds.length,
                // Matches arrays that contain all elements specified in the query.
                $all: [...userIds]
            },
            type,
        });

        if(availableRoom){
            return {
                isNew: false,
                message: 'Retrieving an old chat room',
                chatRoomId: availableRoom._doc._id,
                type: availableRoom._doc.type,

            }
        }
        const newRoom = await this.create({
            userIds,
            type,
            chatInitiator
        });

        return {
            isNew: true,
            message: 'Creating a new Chat Room',
            chatRoomId: newRoom._doc._id,
            type: newRoom.type,
        }
    } catch (error) {
        console.log('Error on start chat', error)
        throw error
    }

}

export default mongoose.model("ChatRoom", chatRoomSchema);