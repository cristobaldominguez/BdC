import express from 'express'

// Import Queries
import { new_user } from '../db/queries/users.js'

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

export default router
