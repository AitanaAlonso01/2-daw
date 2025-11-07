# Servidor BASE

```javascript
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
const appRoutes = require('./routes/app.routes')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/app', appRoutes)

app.listen(port, () => console.log(`http://localhost:${port}`))
```
