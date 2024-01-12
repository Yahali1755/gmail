import mongoose from "mongoose"

import { logger } from "../logger";

export default async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
        logger.info('Connected to MongoDB');
    });
}