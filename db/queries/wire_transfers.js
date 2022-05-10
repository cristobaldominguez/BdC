import pool from '../pool.js'
import { page_limit } from '../../config.js'

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

export {
  get_wire_transfers,
  get_transfers_size
}
