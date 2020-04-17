const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const nodeEnv = process.env.NODE_ENV || 'development';
const dateInTimezone = () => {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(Date.now() - offset)).toISOString().substring(0, 10);
};

winston.add(new winston.transports.Console());
if (!['development', 'test'].includes(nodeEnv)) {
  winston.add(new WinstonCloudWatch({
    logGroupName: `ets-${process.env.DB_SUFFIX}`, // Group logs by deployment environment
    logStreamName: dateInTimezone, // Group logs by date
  }));
}

module.exports = winston;