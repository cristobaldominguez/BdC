import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

import { create_wire_transfer } from '../db/queries/wire_transfers.js'

// DotEnv Config
dotenv.config()

// Router Creation
const router = express.Router()

// Routes
router.get('/new', (req, res) => {
    const { token } = req.query

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ error: "401 Unauthorized", message: err.message })

        res.render('Transfer', { title: 'Transferencia', user, token })
    })
})

router.post('/create', async (req, res) => {
    const { token } = req.query
    const { first_name, last_name, email, rut, comment, amount } = req.body

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ error: "401 Unauthorized", message: err.message })

        try {
            const { id: id_from } = user
            const result = await create_wire_transfer({ id_from, first_name, last_name, rut, email, comment, amount: Number(amount) })
            res.status(201).send(result)

        } catch (e) {
            console.log(e)
            res.status(e.status ? e.status : 500)
               .send({ error: e.error ? e.error : "500 Internal Server Error", message: e.message })
        }
    })
})

export default router
