import pool from '../pool.js'

async function new_user({ first_name, last_name, rut, email, address, password }) {
    const account = Math.floor(Math.random() * (999999 - 0)) + 0

    const query = {
        text: 'INSERT INTO users (account, first_name, last_name, rut, email, address, password, balance) values ($1, $2, $3, $4, $5, $6, $7, 100000) RETURNING *',
        values: [account, first_name, last_name, rut, email, address, password]
    }

    try {
        const result = await pool.query(query)
        return result.rows[0]

    } catch (e) {
        console.error(e)
        return e
    }
}

async function get_user({ rut, email }) {
    const query = {
        text: `SELECT * FROM users WHERE rut = $1 AND email = $1 AND active = true `,
        values: [rut, email]
    }

    try {
        const result = await pool.query(query)
        return result.rows[0]

    } catch (e) {
        console.error(e)
        return e
    }
}

async function get_user_id({ first_name, last_name, rut, email }) {
    const query = {
        text: `SELECT id FROM users WHERE first_name = $1 AND last_name = $2 AND rut = $3 AND email = $4 AND active = true `,
        values: [first_name, last_name, rut, email]
    }

    try {
        const result = await pool.query(query)
        return result.rows[0]

    } catch (e) {
        console.error(e)
        return e
    }
}

export {
    new_user,
    get_user,
    get_user_id
}
