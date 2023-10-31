import passport from "passport";

//Función general para retornar errores en las estrategias de passport

export const passportError = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error)
            }
            if (!user) {
                return res.status(401).send({error: info.messages ? info.messages : info.toString()}) //si me envían info.messages, muestro la respuesta que me enviaron, sino muestro el objeto info pasado a string
            }
            req.user = user
            next()
        })(req, res, next) //esto es porque es un middleware
    }
}

//Ingreso rol y verifico si el usuario lo cumple
export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({error: 'User no autorizado'})
        }
        if (req.user.user.rol != rol) { // si usuario tiene un rol distinto al ingresado como parámetro
            return res.status(403).send({error: 'User no tiene los privilegios necesarios'})
        }
        next()
    }
}