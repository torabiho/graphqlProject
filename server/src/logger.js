import pino from "pino";
import pretty from "pino-pretty";

const prettyStream = pretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "hostname,pid",
});

const logger = pino(prettyStream);

export default logger;
