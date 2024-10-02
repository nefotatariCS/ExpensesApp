const { createLogger, transports } = require("winston");
const { logInfo, logError } = require("./addLogs"); // Adjust the path as needed

jest.mock("winston", () => {
  const mLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };
  return {
    createLogger: jest.fn(() => mLogger),
    transports: {
      DailyRotateFile: jest.fn(),
      Console: jest.fn(),
    },
    format: {
      combine: jest.fn(),
      label: jest.fn(),
      json: jest.fn(),
    },
  };
});

describe("Logger", () => {
  let logger;

  beforeEach(() => {
    logger = createLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("logInfo should log info level messages", () => {
    const message = "This is an info message";

    logInfo(message);

    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining(message));
    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  test("logError should log error level messages", () => {
    const message = "This is an error message";
    const error = new Error("Test error");

    logError(message, error);

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining(message));
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(error.message),
    );
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
