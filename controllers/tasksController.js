const fs = require('fs');
const db = require('../database/db_connection');


const getAllTasks = (req, res) => {
    db.query('SELECT * FROM tasks;', function(err, result) {
        if(err) {
            return res.send('Error reading data.')
        }
        res.json(result);
    })
}

const createTask = (req, res) => {
    const values = [req.body.name, req.body.completed];
    db.query('INSERT INTO tasks (name, completed) VALUES (?, ?)', values, function(err, result){
        if(err) {
            return res.send('Error adding data.')
        }
        res.json({ message: 'Successfully added task.' });
    })
}

const getSingleTask = (req, res) => {
    db.query('SELECT * FROM tasks WHERE id = ?;', [req.params.id], function(err, result) {
        if(err) {
            return res.send('Error READING data for task.')
        }
        res.json(result);
    })
}


const updateTask = (req, res) => {
    const values = [req.body.name, req.body.completed, req.params.id];
    db.query('UPDATE tasks SET name = ?, completed = ? WHERE id = ?', values, function(err, result) {
        if(err) {
            return res.send('Error UPDATING data for task.\n' + err);
        }
        res.json({ message: 'Task updated successfully.' });
    })
}

const deleteTask = (req, res) => {
    const values = [req.params.id];
    db.query('DELETE FROM tasks WHERE id = ?', values, function(err, result) {
        if(err) {
            return res.send('Error DELETING data for task.\n' + err);
        }
        res.json({ message: 'Task deleted successfully.' });
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}