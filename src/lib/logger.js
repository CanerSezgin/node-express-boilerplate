const path = require('path');
const { createLogger, format, transports } = require('winston');
const config = require("../config/config");
const level = config.logger.level;

const formatParams = (info) => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  let shop;
  if (args.shop) {
    shop = args.shop;
    delete args.shop;
  }

  return `${ts} [${level}] ${shop ? `(${shop})` : ''} ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
};

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger;

if (config.meta.isProd) {
  logger = createLogger({
    level: level,
    format: productionFormat,
    transports: [
      new transports.Console({
        format: developmentFormat
      }),
      new transports.File({
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error'
      }),
      new transports.File({
        filename: path.join(__dirname, '../../logs/all.log'),
        level: 'info'
      })
    ]
  });
} else {
  logger = createLogger({
    level: level,
    format: developmentFormat,
    transports: [new transports.Console()]
  });
}

module.exports = logger;
