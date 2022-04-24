import pool from '../pool.js'

async function login({ rut, password }) {
  const query = {
    text: 'SELECT * FROM users WHERE rut = $1 AND password = $2',
    values: [rut, password]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]

  } catch (error) {
    console.error(error)
    return error
  }
}

export {
  login
}
