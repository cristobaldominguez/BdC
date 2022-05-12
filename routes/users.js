import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

// DotEnv Config
dotenv.config()

// Import Queries
import { new_user, update_user, get_user } from '../db/queries/users.js'

// Router Creation
const router = express.Router()

// Routes
router.post('/', async (req, res) => {
    const user = req.body

    try {
        const result = await new_user(user)
        res.status(201).send(result)

    } catch (e) {
        console.log(e)
        res.status(500).send({ error: '500 Internal Server Error', message: e })
    }
})

router.get('/profile', (req, res) => {
    const { token } = req.query
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ error: "401 Unauthorized", message: err.message })

        const { rut, email } = user
        const user_from_db = await get_user({ rut, email })

        res.render('Profile', { title: 'Profile', user: user_from_db, token })
    })
})

router.post('/update', (req, res) => {
    const { token } = req.query
    const { first_name, last_name, email, rut, address } = req.body

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        try {
            const response = await update_user({ id: user.id, first_name, last_name, rut, email, address})
            const new_token = jwt.sign(response, process.env.SECRET_KEY)
            res.status(200).send({...response, token: new_token})

        } catch (e) {

        }
    })
})

export default router
