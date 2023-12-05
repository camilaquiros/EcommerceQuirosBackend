import winston from "winston"; 

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'black',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'magenta',
        debug: 'white'
    }
}

export const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req,res) => {
    logger.debug(`[${new Date().toLocaleString()}]: Logger debug`)
    logger.http(`[${new Date().toLocaleString()}]: Request ${req.method} - ${req.url}`);
    logger.info(`[${new Date().toLocaleString()}]: Logger info`)
    try {
        logger.warning(`[${new Date().toLocaleString()}]: Logger warning`)
        throw new Error('Test error')
    } catch (e) {
        logger.error(`[${new Date().toLocaleString()}]: Ocurrio un error: ${e.message}`)
        logger.fatal(`[${new Date().toLocaleString()}]: Logger fatal`)
        res.status(500).json({message: `Internal server error`})
    }
    res.status(200).send('GET request to main')
}