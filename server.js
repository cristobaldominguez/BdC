import dotenv from 'dotenv'
import { port } from './config.js'
import express from 'express'
import { engine } from 'express-handlebars'

import Handlebars from './helpers/handlebars.js'

// DotEnv Config
dotenv.config()

// Routes
import mainRoutes from './routes/main.js'
import usersRoutes from './routes/users.js'

// Server
const app = express()

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Public Folder
app.use(express.static('public'))

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// App Routes
app.use(mainRoutes)
app.use('/users', usersRoutes)

// 404 Page
app.get("*", (req, res) => {
    res.render('404', { title: 'Oh no! a 404 :(', text: 'No existe la ruta' })
})

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
