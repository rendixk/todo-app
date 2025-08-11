const express = require('express')
const router = express.Router()
const { Users, Task, DoneTask, Support } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtverify = require('../middleware/authMiddleware')

//register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    const existingEmail = await Users.findOne({ where: { email } })
    if(existingEmail) {
      return res.status(400).json({ error: "Email already in use"})
    }

    const newEmail = await Users.create({ email, password })
    res.status(201).json({ message: "Account created successfully", user: newEmail })
  }
  catch(error) {
    console.error(error)
    res.status(500).json({ err: "Internal server error" })
  }
})

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ where: { email }})
    if(!user) return res.status(404).json({ error: "Email not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({ error: "Wrong Password" })

    const token = jwt.sign({ userId: user.id }, "rahasia", { expiresIn: "1d" })
    res.status(200).json({ token, userEmail: user.email })
  }
  catch(error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get('/', jwtverify, async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['password', 'updatedAt']},
      include: [Task, DoneTask, Support]
    });
    res.status(200).json({ message: "Retrieved data user successful", Users: users });
}
catch (error) {
  console.error(error);
  res.status(500).json({ message: "Failed to retrieve data user", details: error.message });
}
})

//get user by token
router.get('/token', jwtverify, async (req, res) => {
  try {
    const userId = req.userId

    const user = await Users.findOne({
      where: { id: userId },
      attributes: ["id", "email", "createdAt", "updatedAt"],
      include: [Task, DoneTask, Support]
  });

    if(!user) {
      return res.status(404).json({ message: "Token invaid" })
    }
    res.status(200).json({ message: "Retrieved data by token is successful", user: user })
  }
  catch(error) {
    console.error(`Internal server error: ${error}`)
    res.status(500).json({ message: "Internal Server Error", details: error.message })
  }
})

router.delete('/reset/all', async (req, res) => {
  try {
    const { sequelize } = require('../models/index')
    
    await sequelize.transaction(async (t) => {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction: t })
      await sequelize.query("TRUNCATE TABLE tasks", { transaction: t })
      await sequelize.query("TRUNCATE TABLE donetasks", { transaction: t })
      await sequelize.query("TRUNCATE TABLE users", { transaction: t })
      await sequelize.query("TRUNCATE TABLE supports", { transaction: t })
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction: t })
    })
    res.status(200).json({ message: "All user data has been reset successfully" })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})


module.exports = router