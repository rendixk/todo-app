const express = require('express')
const router = express.Router()
const { Support, Users } = require('../models')

router.post('/create', async (req, res) => {
   try {
      const { userId, username, email, message } = req.body
      const support = await Support.create({
         username,
         email,
         message,
         userId
      })

      res.status(201).json({ message: "Your support and help already created successfuly", support: support})
   } 
   catch (error) {
      console.error(`Failed to send your support: ${error}`)
      res.status(500).json({ error: "Failed to send your support"})
   }
})

router.get('/', async (req, res) => {
   try {
      const supports = await Support.findAll()
      res.status(200).json({ message: "Retrieved support user successful", supports: supports})
   } 
   catch (error) {
      console.error(`Failed to fetch support message: ${error}`)
      res.status(500).json({ error: "Failed to fetch support message", detail: error.message })
   }
})

router.get('/:id', async (req, res) => {
   try {
      const supportId = await Support.findOne({ where: { id: req.params.id }})
      if(!supportId) {
         return res.status(404).json({ error: "Message from this id is doesn't exist" })
      }
      res.status(200).json({ message: "Successfuly fetch message by id", support: supportId })
   } 
   catch (error) {
      console.error(`Failed to fetch message by id. error: ${error}`)
      res.status(500).json({ error: "Internal server error" })
   }
})

module.exports = router