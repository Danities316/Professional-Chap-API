import mongoose from "mongoose";

import { v4 as uuid4 } from "uuid"

export const USER_TYPES = {
    CONSUMER: 'consumer',
    SUPPORT: 'support'
};

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuid4().replace(/\-/g, ""),
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    { 
        timestamps: true,
        collection: "users"
    }

   
)



export default mongoose.model("User", userSchema);