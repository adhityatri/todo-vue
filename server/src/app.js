const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://marvick:mamapapa@cia-2ssx4.mongodb.net/test?retryWrites=true&w=majority"
var client;

var mongoClient = new MongoClient(uri, {
    reconnectTries:
        Number.MAX_VALUE, autoReconnect: true, useNewUrlParser: true, useUnifiedTopology: true
})

mongoClient.connect((err, db) => { // returns db connection
    if (err != null) {
        console.log(err)
        return
    }
    client = db
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/todo', (req, res) => {
    const collection = client.db("todoDB").collection("todos")

    collection.find().toArray(function (err, results) {
        if (err) {
            console.log(err)
            res.send([])
            return
        }

        res.send(results)
    })
})

app.post('/addTodo', (req, res) => {
    const collection = client.db('todoDB').collection('todos')
    var todo = req.body.todo // parse the data from the request's body
    collection.insertOne({ title: todo }, function (err, results) {
        if (err) {
            console.log(err)
            res.send('')
            return
        }
        res.send(results.ops[0]) // returns the new document
    })
})


app.listen(process.env.PORT || 8081)