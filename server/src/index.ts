import startServer from "./config"
import { logger } from "./logger";

startServer()
    .catch(error => logger.error(error));