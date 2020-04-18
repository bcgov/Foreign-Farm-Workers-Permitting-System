const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const nodeEnv = process.env.NODE_ENV || 'development';
const dateInTimezone = () => {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(Date.now() - offset)).toISOString().substring(0, 10);
};

winston.add(new winston.transports.Console(nodeEnv === 'test' && { silent: true }));
if (!['development', 'test'].includes(nodeEnv)) {
  winston.add(new WinstonCloudWatch({
<<<<<<< HEAD
    logGroupName: `fos-${process.env.DB_SUFFIX}`, // Group logs by deployment environment
=======
    logGroupName: `ftw-${process.env.DB_SUFFIX}`, // Group logs by deployment environment
>>>>>>> refactored project name and removed migration
    logStreamName: dateInTimezone, // Group logs by date
  }));
}

module.exports = winston;
