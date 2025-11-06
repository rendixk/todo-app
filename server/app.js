// => versi asli yang di remake
const express = require('express')
const cors = require('cors')
const app = express()

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
// const doneTaskRouter = require('./routes/donetasks')
// const supportRouter = require('./routes/support')

app.use(express.json())
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use('/welcome', indexRouter)
app.use('/users', userRouter)
app.use('/tasks', taskRouter)
// app.use('/donetasks', doneTaskRouter)
// app.use('/support', supportRouter)

//cek route root
app.get('/', (req, res) => {
  res.send(indexRouter)
})
app.get('/users', (req, res) => {
  res.send(userRouter)
})

//404 error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

console.log(process.env.NODE_ENV)

module.exports = app