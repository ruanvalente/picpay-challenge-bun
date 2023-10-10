import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response
    .send({ data: { user: { name: 'John', email: 'john@email.com' } } })
    .status(200)
})
app.listen(3001, () =>  console.log('Server listening on http://localhost:3001'))