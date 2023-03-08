import { createLogger, format, transports} from "winston";
import dotenv = require("dotenv");

dotenv.config();

export const logger = createLogger({
    level: process.env.LOGGER,
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()]
});