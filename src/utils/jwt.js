import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /* 
        primer parámetro: objeto asociado al token
        segundo parámetro: clave privada para el cifrado
        tercer parámetro: tiempo de expiración
    */

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '12h'})
    return token
}

export const authToken = (req, res, next) => {
    //consulto header
    const authHeader = req.headers.Authorization //consulto si existe token
    if(!authHeader) {
        return res.status(401).send({error: 'Usuario no autenticado'})
    }
    const token = authHeader.split(' ')[1] //separo en dos el token y me quedo con la parte valida

    jwt.sign(token, process.env.JWT_SECRET, (error, credentials) => {
        if (error) {
            return res.status(403).send({error: "usuario no autorizado"})
        }
        //descifro token
        req.user = credentials.user
        next()
    })
}