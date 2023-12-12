import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});