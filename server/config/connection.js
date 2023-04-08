import mongoose from "mongoose"; 
import config from "./index.js";


mongoose.set("strictQuery", true);
const connectionURL = `mongodb+srv://danities:${config.database.password}@cluster0.iksrsrk.mongodb.net/${config.database.dbName}?retryWrites=true&w=majority`

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
} 
)

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected successfully')
} 
)
mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
} 
)
mongoose.connection.on('error', (error) => {
    console.log(`Mongoconnection has an error: ${error}`)
    mongoose.disconnect()
} 
)
