export const getRegister = async(req,res) => {
    res.render('register')
}

export const postRegister = async (req,res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: 'Usuario ya existente' })
        }
        return res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send({ mensaje: `Error al crear usuario ${error}` })
    }
}

export const getDetails = async(req,res) => {
    res.render('user', {first_name: req.user.first_name, last_name: req.user.last_name, age: req.user.age, email: req.user.email, isLoged: req.session.email != undefined}) 
}



