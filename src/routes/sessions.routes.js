import { Router } from "express";
import passport from "passport";
import { getLogin, postLogin, github, githubSession, postLogout } from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.get('/', getLogin)

sessionRouter.post('/', passport.authenticate('login'), postLogin)

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), github)

sessionRouter.get('/githubSession', passport.authenticate('github'), githubSession)

sessionRouter.post('/logout', postLogout)

export default sessionRouter