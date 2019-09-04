const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://marvick:mamapapa@cia-2ssx4.mongodb.net/test?retryWrites=true&w=majority"
const ObjectId = require("mongodb").ObjectID;
var client;

var mongoClient = new MongoClient(uri, {
    reconnectTries:
        Number.MAX_VALUE, autoReconnect: true, useNewUrlParser: true, useUnifiedTopology: true
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081, () => {
    mongoClient.connect((err, db) => { // returns db connection
        if (err != null) {
            console.log(err)
            return
        }
        client = db
        collection = client.db('todoDB').collection('todos');
        console.log("connected to todo db!");
    })
})

app.get('/todo', (req, res) => {
    collection.find().toArray(function (err, results) {
        if (err) {
            console.log(err)
            res.send([])
            return
        }

        res.send(results)
    })
})

app.get('/todo/:id', (req, res) => {
    collection.findOne({
        "_id": new ObjectId(req.params.id)
    }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

app.patch('/todo/:id', (req, res) => {
    collection.findOneAndUpdate({
        "_id" : new ObjectId(req.params.id)
    },{
        $set: {"title" : req.body.title}
    }, (err, result) => {
        if (err){
            return res.status(500).send(err)
        }

        res.send(result);
    })
})



app.delete('/todo/:id', (req, res) => {
    collection.findOneAndDelete({
        "_id": new ObjectId(req.params.id) 
    }, (err, result) => {
        if (err){
            return res.status(500).send(err)
        }
        res.status(200).send()
    })
})

app.post('/addTodo', (req, res) => {
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