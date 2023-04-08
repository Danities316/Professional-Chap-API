import mongoose, { ConnectionStates } from "mongoose"; 
import config from ".";

const connectionURL = "mongodb+srv://danities:Ichaba%4035545177@cluster0.iksrsrk.mongodb.net/chatDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionURL,{
    userNewUrlParser: true,
    useInifiedTopology: true
} 
)
mongoose.connect(connectionURL,{
    userNewUrlParser: true,
    useInifiedTopology: true
} 
)
mongoose.connect.on('connected', () => {
    console.log('Mongo has connected successfully')
} 
)
mongoose.connect.on('reconnected', () => {
    console.log('Mongo has reconnected')
} 
)
mongoose.connect.on('error', (error) => {
    console.log(`Mongo has connection has an error: ${error}`)
    mongoose.disconnect()
} 
)
