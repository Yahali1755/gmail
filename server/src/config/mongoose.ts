import mongoose from "mongoose"

export default () => {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
}