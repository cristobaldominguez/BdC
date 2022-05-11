import pool from '../pool.js'
import { page_limit } from '../../config.js'

import { get_user_id } from './users.js'

async function get_wire_transfers({ id }, offset = 0, limit = page_limit) {
    const query = {
        text: `SELECT trs.id, date, id_from, u.first_name AS name, comment, trs.amount FROM wire_transfers AS trs INNER JOIN users AS u ON trs.id_to = u.id WHERE (id_from = $1 OR id_to = $1) AND trs.active = true OFFSET $2 LIMIT $3`,
        values: [id, offset, limit]
    }

    try {
        const result = await pool.query(query)
        return result.rows

    } catch (e) {
        console.error(e)
        return e
    }
}

async function get_transfers_size({ id }) {
    const query = {
        text: `SELECT COUNT(trs.id) FROM wire_transfers AS trs INNER JOIN users AS u ON trs.id_to = u.id WHERE (id_from = $1 OR id_to = $1) AND trs.active = true`,
        values: [id]
    }

    try {
        const result = await pool.query(query)
        return result.rows[0]

    } catch (e) {
        console.error(e)
        return e
    }
}

async function create_wire_transfer({ id_from, first_name, last_name, rut, email, comment, amount }) {
    const result = await get_user_id({ first_name, last_name, rut, email })
    
    if (!result) throw { status: 400, error: 'Bad Request', message: 'No se consiguió ningun usuario de destino con esos datos' }

    const { id: id_to } = result
    if (id_from == id_to) throw { status: 400, error: 'Bad Request', message: 'No puede transferirse a usted mismo' }

    await pool.query('BEGIN')
    await pool.query({
        text: `UPDATE users SET balance = balance + $1 WHERE id = $2`,
        values: [Number(amount), id_to]
    })

    await pool.query({
        text: `UPDATE users SET balance = balance - $1 WHERE id = $2`,
        values: [Number(amount), id_from]
    })

    await pool.query({
        text: `INSERT INTO wire_transfers(id_to, id_from, comment, amount) VALUES ($1, $2, $3, $4)`,
        values: [id_from, id_to, comment, amount]
    })
    await pool.query('COMMIT')
}

export {
    get_wire_transfers,
    get_transfers_size,
    create_wire_transfer
}
