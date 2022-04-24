import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))
const db = {
    host: 'localhost',
    database: 'bdc',
    port: 5432
}

export { port, root, db }
