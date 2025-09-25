import logger from '../utils/Logger.js';

const RequestLogger = (req, res, next)=>{
    logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
    next();
}

export default RequestLogger;