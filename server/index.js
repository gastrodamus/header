const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.get('/', (req, res) => res.send('Hello World! from express server'))

app.listen(port, () => console.log(`Server listening on port ${port}!`))