import passport from "passport";

export const getRegister = async(req,res) => {
    res.render('register')
}

export const postRegister = async(req,res) => {
    try {
        if(!req.user) {
            res.status(400).send({mensaje: 'usuario ya existente'})
        }
        return res.render('user', {first_name: req.user.first_name, last_name: req.user.last_name, age: req.user.age, email: req.user.email, isLoged: req.session.email != undefined})
    } catch (error) {
        res.status(500).send({mensaje: `error al crear usuario ${error}`})
    }
}

export const getDetails = async(req,res) => {
    res.render('user', {first_name: req.user.first_name, last_name: req.user.last_name, age: req.user.age, email: req.user.email, isLoged: req.session.email != undefined}) 
}



