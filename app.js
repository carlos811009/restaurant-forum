const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models')
const session = require("express-session")
const flash = require('connect-flash')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const app = express()
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use('/upload', express.static(__dirname + '/upload'))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})


require('./routes')(app, passport)
module.exports = app


app.listen(port, () => {
  db.sequelize.sync()
  console.log(`http://localhost:${port} is running`)
})
