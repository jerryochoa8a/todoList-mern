const moment = require('moment');
const { task } = require('../models/task.models');
var CurrentDate = moment();



module.exports.createtask = (request, response) => {
    const { title, category, due, priority, done } = request.body;
    task.create({
        title,
        category,
        due,
        priority,
        done
    })
        .then(task => response.json(task))
        .catch(err => response.status(400).json(err))
}

module.exports.getAlltasks  = (request, response) => {
    task.find({})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getDueTasks  = (request, response) => {
    task.find({due: CurrentDate})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getLowTasks  = (request, response) => {
    task.find({priority:'Low'})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getMediumTasks  = (request, response) => {
    task.find({priority:'Medium'})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getHighTasks  = (request, response) => {
    task.find({priority:'High'})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getDoneTasks  = (request, response) => {
    task.find({done: true})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.getNotDoneTasks  = (request, response) => {
    task.find({done: false})
        .then(tasks => response.json(tasks)) //this is a the var that we can use
        .catch(err => response.json(err))
}

module.exports.gettask = (request, response) => {
    task.findOne({_id:request.params.id})
        .then(onetask => response.json(onetask))
        .catch(err => response.json(err))
}

module.exports.updatetask = (request, response) => {
    task.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedtask => response.json(updatedtask))
        .catch(err => response.json(err))
}

module.exports.deletetask = (request, response) => {
    task.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}