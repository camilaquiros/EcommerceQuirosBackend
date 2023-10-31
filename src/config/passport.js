import local from 'passport-local'
import passport from 'passport'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { userModel } from '../models/users.models.js'



//defino estrategia a utilizar
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt //extractor de los headers de la consulta

export const initializePassport = () => {
    
    const cookieExtractor = req => {
        //{} objeto vacío = no hay cookies, no es lo mismo a que no existe la cookie
        //si existe cookies, consulte por mi cookie, y sino asigno null 
        const token = req.cookies ? req.cookies.jwtCookie : {}
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //consulto el token de las cookies
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload) //retorno el contenido del token
        } catch (error) {
            return done(error)
        }
    }))


    // done es como si fuera un res.status(), el callback de respuesta
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            //defino como voy a registrar un user
            const {first_name, last_name, email, age} = req.body
            try {
                const user = await userModel.findOne({ email: username })
                if(user) {
                    //done es como si fuera un return de un callback
                    return done(null, false)
                }
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash
                })
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
        try {
            const user = await userModel.findOne({email: username})
            if(!user) {
                return done(null,false)
            }

            if(validatePassword(password, user.password)) {
                return done(null, user) //usuario y password validos
            }

            return done(null, false) //password no valida

        }catch(error) {

        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({email: profile._json.email})
            if(!user) {
                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18, //edad por defecto
                    password: 'password'
                })
                done(null, userCreated)
            } else {
                done(null,user)
            }
        } catch (error) {
            done(error)
        }
    }
    ))

    //inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    //eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

