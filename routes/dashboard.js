import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

import { get_wire_transfers, get_transfers_size } from '../db/queries/wire_transfers.js'
import { page_limit } from '../config.js'

// Router Creation
const router = express.Router()

// DotEnv Config
dotenv.config()

// Routes
router.get('/', (req, res) => {
    const { pag, token } = req.query
    const current_page = pag ? Number(pag) : 1
    const offset = (current_page - 1) * page_limit

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid Token' })

        try {
            const transfers = await get_wire_transfers(user, offset, page_limit)
            const transfers_quantity_rough = await get_transfers_size(user)
            const max_transfer_pages = Math.ceil(Number(transfers_quantity_rough.count) / page_limit)

            const next = current_page + 1 <= max_transfer_pages ? current_page + 1 : null
            const prev = current_page > 1 ? current_page - 1 : null

            res.render('Dashboard', { title: 'Dashboard', prev, next, user, transfers, token })

        } catch (error) {
            console.log(error);
            res.status(500)
               .send({ error: "500 Internal Server Error", message: error })
        }
    })
})

export default router
