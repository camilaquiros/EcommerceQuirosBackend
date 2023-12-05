import { generateToken } from "../utils/jwt.js";

export const getLogin = async(req, res) => {
    res.render('home')
}

export const postLogin = async(req, res) => {
    try {
        if(!req.user) {
            return res.status(401).send({mensaje: "Invalidate user"})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        }) 
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({mensaje: `Error al iniciar sesion ${error}`})
    }
}

export const getCurrent = async(req, res) => {
    res.send(req.user)
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
