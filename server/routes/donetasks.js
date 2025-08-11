const express = require('express')
const router = express.Router()
const { DoneTask, Task, Users } = require('../models')
const { route } = require('./users')

router.post('/:id', async (req, res) => {
   try {
      // const taskId = req.params.id
      const task = await Task.findByPk(req.params.id)

      //searching for task based on ID
      if(!task) {
         return res.status(404).json({ message: "Task not found" })
      }

      //moved tasks to done_tasks
      const doneTasks = await DoneTask.create({
         title: task.title,
         subtitle: task.subtitle,
         note: task.note,
         userId: task.userId,
         completedAt: new Date()
      })

      //deleted from tasks tabel
      await Task.destroy({ where: { id: req.params.id}})
      res.status(201).json({ message: "Task successfully moved to completed tasks", donetasks: doneTasks })
   }
   catch (error) {
      console.error(`Failed moved task: ${error}`)
      return res.status(500).json({ message: "Internal server error" })
   }
})

router.get('/', async (req, res) => {
   try {
      const doneTask = await DoneTask.findAll()
      res.status(200).json({ message: "Retrieved DoneTask User successful", DoneTask: doneTask })
   } 
   catch (error) {
      console.error(error)
      res.status(500).json({ message: "Failed to retrieve DoneTask user" })
   }
})

router.get('/:id', async (req, res) => {
   try {
      const { id } = req.params
      if(!id) {
         return res.status(400).json({ error: "User not found" })
      }

      const completedTasks = await DoneTask.findAll({
         where: { userId: id },
         include: [
            {
               model: Users,
               as: "User",
               attributes: ['id', 'email']
            }
         ],
         order: [['completedAt', 'DESC']]
      })

      if(!completedTasks.length) {
         return res.status(404).json({ message: "Completed task for this user is not found"})
      }
      res.status(200).json(completedTasks)
   }
   catch (error) {
      console.error(`Error fetching completed tasks: ${error}`)
      res.status(500).json({ message: "Something went wrong when fetch completed tasks"})
   }
})

router.delete('/:id', async (req, res) => {
   try {
      const task = await DoneTask.findByPk(req.params.id)
      if(!task) return res.status(404).json({ message: "Task not found" })

      await DoneTask.destroy({ where: { id: req.params.id }})
      res.status(200).json({ message: "Task deleted successfully" })
   } 
   catch (error) {
      console.error(`Failed to delete task: ${error}`)
      res.status(500).json({ message: "Failed to delete task" })
   }
})

module.exports = router