const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-roters')
const contactRoutes = require('./routes/contact-routes')
const apiPostRoutes = require('./routes/api-post-roters')
const createPath = require('./helpers/create-path')

console.log('lesson 20: heroku')

const errMsg = chalk.bgKeyword('white').redBright
const sucMsg = chalk.bgKeyword('green').yellowBright

const app = express()
app.set('view engine', 'ejs')
const PORT = process.env.PORT
const db = process.env.MONGO_URL

mongoose
  .set('strictQuery', true)
  .connect(db)
  .then(res => console.log(sucMsg('Conected to DB: ad')))
  .catch(err => console.log(errMsg(err)))


app.listen(PORT, err => {
  err ? console.log(err) : console.log(`port: ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static('css'))
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  const title = 'home'
  res.render(createPath('index'), { title })
})

app.get('/about', (req, res) => {
  res.redirect('/contacts')
})

app.use(postRoutes)
app.use(contactRoutes)
app.use(apiPostRoutes)

app.use((req, res) => {
  const title = 'error'
  res
    .status(404)
    .render(createPath('error'), { title })
})
