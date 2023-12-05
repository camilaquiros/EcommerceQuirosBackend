import { Router } from "express";
import nodemailer from 'nodemailer'
import { __dirname } from '../path.js'

const mailRouter = Router();

//NODEMAILER
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
        authMethod: 'LOGIN'
    }
})

mailRouter.get('/', async(req, res) => {
    const resultado = await transporter.sendMail({
        from: 'TEST Camila camila.tester01@gmail.com',
        to: 'camila.tester@hotmail.com',
        subject: 'TEST EMAIL',
        html: 
            `
            <div>
                <h1>Esta es la prueba de que trabaje</h1>
                <p>Debes reenviar este email a 5 contactos</p>
            </div> 
        `,
        attachments: [{
            filename: 'cheems.jpg',
            path: __dirname+'/images/cheems.jpg',
            cid:'cheems'
        }]
    })
    res.send('Mail enviado')
})

export default mailRouter