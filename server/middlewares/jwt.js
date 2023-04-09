import  jwt  from "jsonwebtoken";
import UserModel from "../model/User.js"
import config from "../config/index.js";

const secretKey = config.SECRET_KEY


export const encode = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await UserModel.findById( userId)
        const payload = {
            userId: user._id,
            userType: user.type
        }

        const authToken = await jwt.sign(payload, secretKey)
        // console.log('Auth: ', authToken)
        req.authToken = authToken
        next()
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

export const decode = async (req, res, next) => {
    if(!req.headers[' authorization']){
        return res.status(400).json({ success: false, message: 'No access token provided' })
    }
    const accessToken = req.headers.authorization.split(' ')[1]

    try {
        const decoded = await jwt.verify(accessToken, secretKey)
        req.userId = decoded.userId
        req.userType = decoded.type 
        return next()
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
};

