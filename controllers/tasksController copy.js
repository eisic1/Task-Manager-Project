const fs = require('fs');


const getAllTasks = (req, res) => {
    fs.readFile('taskData.csv', 'utf-8', function (err, data) {
        if(err) res.json(err);
        
        const rows = data.split('\n');
        let returnArray = [];
        let returnObject = null;
        if(rows[0] === '') res.json(returnArray);
        else{
            rows.forEach(el => {
                const items = el.split(',');
                let completItem = false;
                if(items[2].replace(/\r/g, '') === 'true') completItem = true; 
                returnArray.push({ id: Number(items[0]), name: items[1], completed: completItem });
            })
            res.json(returnArray);
        }
        
    })
}

const createTask = (req, res) => {
    fs.readFile('taskData.csv', 'utf-8', function (err, data) {
        if(err) res.json(err);
        
        const rows = data.split('\n');
        if(rows[0] === ''){
            const csvData = `1,${req.body.name},${req.body.completed}`;
            fs.writeFile('taskData.csv', csvData, (err) => {
                if(err) res.json(err);

                res.json({ message: 'Successfully added task.' })
            })
        }
        else{
            const newID = Number(rows[rows.length-1].split(',')[0]);
            const csvData = `\n${newID+1},${req.body.name},${req.body.completed}`;
            fs.appendFile('taskData.csv', csvData, (err) => {
                if(err) res.json(err);

                res.json({ message: 'Successfully added task.' })
            })
        }
        
    })
}

const getSingleTask = (req, res) => {
    fs.readFile('taskData.csv', 'utf-8', function (err, data) {
        if(err) res.json(err);
        
        const rows = data.split('\n');
        if(rows[0] === '') res.json({ message: 'Task does not exist' });
        else{
            let returnObject = { message: 'Task does not exist' };
            rows.forEach(el => {
                const items = el.split(',');
                let completItem = false;
                if(items[2].replace(/\r/g, '') === 'true') completItem = true; 
                if(Number(items[0]) === Number(req.params.id)) 
                    returnObject = { id: Number(items[0]), name: items[1], completed: completItem };
            })
            res.json(returnObject);
        }
        //res.json(returnObject);
    })
}

const updateTask = (req, res) => {
    res.send('Update task');
}

const deleteTask = (req, res) => {
    fs.readFile('taskData.csv', 'utf-8', function (err, data) {
        if(err) res.json(err);
        
        const rows = data.split('\n');
        if(rows[0] === '') res.json({ message: 'Task does not exist' });
        else{
            let returnObject = { message: 'Task does not exist' };
            let index = -1;
            rows.forEach((el, i) => {
                const items = el.split(',');
                if(Number(items[0]) === Number(req.params.id)) index = i;
                    //returnObject = { id: Number(items[0]), name: items[1], completed: completItem };
            })
            if(index !== -1){
                rows.splice(index, 1);
                returnObject = { message: `Successfully deleted task with ID ${req.params.id}` };
                const updatedCSV = rows.join('\n');
                fs.writeFile('taskData.csv', updatedCSV, (err) => {
                    if (err) throw err;
                    returnObject = { message: 'Successfully deleted task with ID' };
                });
            }
            res.json(returnObject);
        }
    })
    //res.send('Delete task');
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}