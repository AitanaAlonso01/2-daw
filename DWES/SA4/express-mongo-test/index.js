const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

// URL de conexión
const mongoURL = 'mongodb://10.2.1.98:27017/testdb'

// Conexión a MongoDB
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err))

// Middleware para JSON
app.use(express.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando y MongoDB conectado')
})

// Endpoint CRUD básico (ejemplo: crear documento)
const ItemSchema = new mongoose.Schema({ name: String })
const Item = mongoose.model('Item', ItemSchema)

app.post('/item', async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name })
    await newItem.save()
    res.json({ message: 'Item creado', item: newItem })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
