const express = require("express"); // importing express from third-party   npm express
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/dashboard", function (req, res) {
  let loggedIn = false;

  if (!loggedIn) {
    res.status(401).send({
      msg: "unauthenticated.",
    });
  }

  let data = {
    total: 100,
    completed: 10,
  };

  res.send(data);
});

app.get("/api/todos", function (req, res) {
  let todos = ["react", "js", "css", "html", "express"];
  res.send(todos);
});

/*url: localhost:8000/ */
/*url: localhost:8000/api/dashboard */
/*url: localhost:8000/api/todos */
app.listen(8000, () => {
  console.log("server started");
});

/* middleware  */
