const express = require('express');
const mongoose = require('mongoose');
const Task = require('../model/tasks')
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.get('/',(req,res)=> {
    Task.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/add',(req,res)=> {
    const task = new Task(req.body)

    task.save()
        .then((result)=> {
            res.json(result)
        })
        .catch(err => console.log(err))
})

app.post('/delete',(req,res) => {
    Task.deleteOne(req.body)
    .catch(err => console.log(err))
})

app.post('/clear',(req,res) => {
    const todos = req.body.filter(item => item.completed);
    todos.forEach(item => {
        const id = item._id;
        Task.deleteOne({id})
        .catch(err => console.log(err))
    })
})

app.post('/update',(req,res)=> {
    const {id,info} = req.body;
    Task.findOneAndUpdate({id},{info})
    .catch(err => console.log(err))
})


mongoose.connect(process.env.db_URI, { useNewUrlParser:true,useUnifiedTopology:true })
        .then(()=> app.listen(PORT))
        .catch(err=> console.log(err))
