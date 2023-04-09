//utilities
import makeValidation from "@withvoid/make-validation"
//models
import UserModel, {USER_TYPES} from "../model/User.js"


export default {
    getAllUsers: async(req, res) => {
        try {
            const user = await UserModel.find()
            return res.status(200).json({success: true, user})
        } catch (error) {
            return res.status(500).json({success: `An error occur, the error is: ${error}`})
        }
    },
    getUserById: async(req, res) => {
        const _id = req.params.id
        try {
            const user = await UserModel.findById({ _id })
            return res.status(200).json({success: true, user})
        } catch (error) {
            return res.status(500).json({success: `An error occur, the error is: ${error}`})
        }
    },
    createUser: async (req, res) => {
        try {
            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    firstName: {type: types.string},
                    lastName: {type: types.string},
                    type: {type: types.enum, options: { enum: USER_TYPES}},
                }
            }));
            if(!validation.success){
                return res.status(400).json(validation)
            }
            const {firstName, lastName, type} = req.body
            const user = await UserModel.create({firstName, lastName, type})
            return res.status(200).json({success: true, user})

        } catch (error) {
            return res.status(500).json({success: `An error occur, the error is: ${error}`})
        }
    },
    deleteUserById: async (req, res) => {
        const _id = req.params.id
        try {
            const userExist =  await UserModel.findOne({_id })
            if(!userExist){
                return res.status(200).json(`No user with ${_id} as ID`)
            }
            const user = await UserModel.deleteOne({ _id })
            return res.status(200).json({
                success: true, 
                message: `User ${userExist.firstName} is deleted.` 
            
            })
        } catch (error) {
            return res.status(500).json({success: `An error occur, the error is: ${error}`})
        }
    },
}