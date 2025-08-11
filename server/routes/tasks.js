const express = require('express')
const router = express.Router()
const { Task } = require('../models')
const jwtverify = require('../middleware/authMiddleware')

router.post('/create', jwtverify, async (req, res) => {
   try {
      const { title, subtitle, note } = req.body
      const userId = req.userId
      console.log('Data yang akan dibuat:', { title, subtitle, note, userId })

      const newTask = await Task.create({ title, subtitle, note, userId })
      res.status(201).json({ message: "Added new task", task: newTask})
   }
   catch (error) {
      console.error(`Failed to create task: ${error}`)
      res.status(500).json({ message: "Failed to create task", error: error })
   }
})

router.get('/', jwtverify, async (req, res) => {
   try {
      const userId = req.userId
      const tasks = await Task.findAll({
         where: { userId: userId },
         attributes: ["id", "title", "subtitle", "note", "userId", "createdAt", "updatedAt", "isCompleted"]
       })
      res.status(200).json({ message: "Retrieved tasks successfully", tasks: tasks})
   }
   catch (error) {
      console.error(`Failed to fetch tasks: ${error}`)
      res.status(500).json({ message: "Internal server error", error: error.message })
   }
})

router.get('/:id', jwtverify, async (req, res) => {
   try {
      const taskId = req.params.id
      const userId = req.userId
      
      const task = await Task.findOne({ where: { id: taskId, userId: userId }})
      if(!task){
         return res.status(404).json({ message: "Task not found or you don't have access to this task."})
      }
      res.status(200).json({ message: "Successful fetch task by id", task: task})
  } 
  catch (error) {
   console.error(`Failed to fetch task by id: ${error}`)
   res.status(500).json({ error: "Failed to fetch task by id", details: error.message })
  }
})


router.put('/:id', jwtverify, async (req, res) => {
   try {
      const { title, subtitle, note, isCompleted } = req.body
      const taskId = req.params.id
      const userId = req.userId

      const [updatedRowsCount, updatedTasks] = await Task.update({ title, subtitle, note, isCompleted },
         { where: { id: taskId, userId: userId }, returning: true })

      if (updatedRowsCount === 0) {
         return res.status(404).json({ message: "Task not found or you don't have access to this task."})
      }
      
      const updatedTask = updatedTasks[0]
      res.status(200).json(updatedTask)
  } 
  catch (error) {
      console.error(`Failed to update task: ${error}`)
      res.status(500).json({ message: "Failed to update task", error: error.message })
  }
})

router.delete('/:id', jwtverify, async (req, res) => {
   try {
      const taskId = req.params.id
      const userId = req.userId

      const task = await Task.findOne({ where: { id: taskId, userId: userId }});
      if(!task) {
         return res.status(404).json({ message: "Task not found or you don't have access to this task." });
      }

      await Task.destroy({ where: { id: taskId, userId: userId }})
      res.status(200).json({ message: "Task deleted successfully" })
   } 
   catch (error) {
      console.error(`Failed to delete task: ${error}`)
      res.status(500).json({ message: "Failed to delete task", error: error.message })
   }
})

module.exports = router