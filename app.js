const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'handlebars')



app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})