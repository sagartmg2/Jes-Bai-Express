/* 
    to create new database
    > use <dbName>
        eg. use baishakh

*/


/* sql vs no-sql

    table -> collection
    row -> document

*/

/* to create table/collection in database */
db.createCollection("todos")
db.createCollection("users")

/* 
view the list of colelctions in particular db
> show collections 
*/

db.todos.insertOne({ name: "html" })
db.todos.insertOne({ name: "css" })
db.todos.insertOne({ name: "js" })
db.todos.insertOne({ name: "react" })
db.users.insertOne({ name: "ram" })
db.products.insertOne({ name: "watch" })

db.products.insertMany([
    { name: "apple" },
    { name: "orange" }
])


/* fetch from datbase */
db.products.find()

/* delete table /collection */
db.products.drop()

db.products.insertMany([{ name: "mouse" }, { name: "keyboard" }])

db.todos.insertOne({ name: "express", status: false })

db.todos.find({ name: "html" })

/* update operators 
    $set
    $inc
    .
    .
    .
*/

db.todos.updateOne({ name: "html" },{ $set:{status:false}})
db.todos.updateMany({ name: "html" },{ $set:{status:true}})
db.todos.updateOne({ name: "css" },{ $set:{status:true}})
db.todos.updateOne({ name: "css" },{ $set:{status:true}})
