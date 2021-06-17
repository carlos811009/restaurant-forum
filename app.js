const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./models')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))


require('./routes')(app)
module.exports = app


app.listen(port, () => {
  db.sequelize.sync()
  console.log(`http://localhost:${port} is running`)
})
