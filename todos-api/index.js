const express = require("express"); // importing express from third-party   npm express
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/b-j-todos')
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(err)
  })


const Todo = require("./model/Todo")


app.use(express.json()) // glboal middleware

app.post("/api/todos", async function (req, res) {

  try {
    console.log("req.body", req.body);

    let todo = await Todo.create({ title: req.bod.title })
    console.log(todo)
    res.send(todo);

  }
  catch (err) {
    res.status(500).send("server error")
  }

});

app.get("/api/todos", async function (req, res) {
  let todos = await Todo.find()
  res.send(todos);
});

app.listen(8000, () => {
  console.log("server started");
});



/* todos: [ 
    {title:"git"},
    {title:"react"},
    {name:"express"},
  ] */

/* products: [ 
    {price:1000},
    {rate:2000},
    {name:"express"},
  ] */


/* product[0].price */
/* product[1].price */

/*
  todos[0].title
  todos[0].title
  todos[2].title // undefined..
 
*/