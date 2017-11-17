'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;
var todos = require('../models/todos')

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', function (req, res) {
    // Note: This is a relative path to the /user path from our app.js
    // Think: what do we want to see when we go to "/users"? All the users with tasks.
    // Note: res.json(val) is shorthand for res.send(JSON.stringify(val))
    res.json(todos.listPeople())
});

// The above passes the 1st 3 specs

router.get('/:name/tasks', function (req, res) {
    
    // the list() method requires a 'name' paramenter; also, /:name is available by req.params as req.params.name
    var tasks = todos.list(req.params.name); // passes the 4th spec

    // error handling for 9th spec
        // if name doesn't exist in todos
    if (tasks === undefined) {
        return res.sendStatus(404);  // return to ensure the rest of the code is not run
    }
        // Another way to error handle--include 'next' param (i.e., function (req, res, next) {})
        // if (tasks === undefined) {
        //     var error = new Error('No such user');
        //     error.status = 404;
        //     next(error);
        //     return;
        //   }

    if (req.query.status === 'complete') tasks = tasks.filter(function(task) { return task.complete; })
    if (req.query.status === 'active') tasks = tasks.filter(function(task) { return !task.complete; })
    res.json(tasks); // passes 4th spec
    // the above passes the 7th and 8th specs
})

router.post('/:name/tasks', function (req, res, next) {
    
    // error handling for 9th spec
    // if task doesn't have content in the body
    if (!req.body.content) {
            return res.sendStatus(400);
        }
        
        // Another way to error handle--include 'next' param (i.e., function (req, res, next) {})
        // if (!req.body.content) {
        //     var error = new Error('This request must have content in its body');
        //     error.status = 400;
        //     next(error);
        //     return;
        // }
        
    var newTask = todos.add(req.params.name, req.body)
    res.status(201).send(newTask)
    // don't forget to return a task in your add method or else "Error: expected "Content-Type" header field"
    // OR 
    // todos.add(req.params.name, req.body);
    // const userTodos = todos.list(req.params.name);
    // // Note: the list method returns a value, allowing Content Type header to exist
    // const justAdded = userTodos[userTodos.length - 1]; // gets last todo (just added)
    // res.status(201).send(justAdded);
})

// The above passes the 5th and 6th specs

router.put('/:name/tasks/:index', function (req, res) {
    // to mark a task as complete, we go to todos and input the complete() method's parameters--name and index
    todos.complete(req.params.name, req.params.index)
    res.send();
})

router.delete('/:name/tasks/:index', function (req, res) {
    todos.remove(req.params.name, req.params.index)
    res.sendStatus(204);
    // res.status(204).send(); // sendStatus() same as .status().send()
})





