import express from 'express'
import jwt from 'jsonwebtoken'

// Router Creation
const router = express.Router()

// Queries
import { login } from '../db/queries/main.js'

// Routes
router.get('/', (_, res) => {
    res.render('Home', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
})

router.post('/login', async (req, res) => {
    const credentials = req.body

    try {
        const user = await login(credentials)

        if (user) {
            const token = jwt.sign(user, process.env.SECRET_KEY)
            res.status(200).send(token)

        } else {
            res.status(404).send('Usuario o password incorrectos')
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ error: '500 Internal Server Error', message: error })
    }
})

router.get('/registro', (_, res) => {
    res.render('Register');
})

export default router
