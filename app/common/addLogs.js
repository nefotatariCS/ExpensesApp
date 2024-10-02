const { format, createLogger, transports } = require("winston");
const { combine, label, json } = format;
require("winston-daily-rotate-file");

const CATEGORY = "Backend Logs";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/backend-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
});

const logger = createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), json()),
  transports: [fileRotateTransport, new transports.Console()],
});

function logInfo(message) {
  const logMessage = `${new Date().toISOString()} - ${message}`;
  logger.info(logMessage);
}

function logError(message, error) {
  const logMessage = `${new Date().toISOString()} - ${message} - ${
    error.message
  }`;
  logger.error(logMessage);
}

module.exports = {
  logger,
  logInfo,
  logError,
};
