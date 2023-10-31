import { generateToken } from "../utils/jwt.js";

export const getLogin = async(req, res) => {
    res.render('home')
}

export const postLogin = async(req, res) => {
    try {
        if(!req.user) {
            return res.status(401).send({mensaje: "Invalidate user"})
        }
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        }) 
        res.redirect('api/products') 
    } catch (error) {
        res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
    }
}

export const github = async(req, res) => {
    res.redirect('products')
}

export const githubSession = async(req, res) => {
    req.session.user = req.user
    res.status(200).send({mensaje: 'session creada'})
}

export const postLogout = (req, res) => {
    if (req.session) {
        req.session.destroy()
        res.clearCookie('jwtCookie')
        res.redirect('/')
    }
}
