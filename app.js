const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models')
const session = require("express-session")
const flash = require('connect-flash')
const app = express()
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message')
  res.locals.error_messages = req.flash('error_messages')
  next()
})


require('./routes')(app)
module.exports = app


app.listen(port, () => {
  db.sequelize.sync()
  console.log(`http://localhost:${port} is running`)
})
