// const express = require('express')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const db = mongoose.connection

// //Enviromental Variables
// const app = express()
// const mongoURI = process.env.MONGODB_URI
// const PORT = process.env.PORT || 3001

// //Connection to MongDB
// mongoose.connect(mongoURI, { useNewUrlParser: true},
//     () => console.log('MongoDB connection establish'))

// mongoose.connect.once('open', ()=> {
//     console.log('connected to mongo')
// })
// mongoose.set('strictQuery', true)

// //SHOW ALL ROUTE
// app.get('/', (req,res) => {
//     Todos.find({}, (error, allTodos) => {
//         res.render('Index', {
//             fruits: allFruits
//         })
//     })
// })


const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const Todos = require('./models/todos')
const cors = require('cors')
const db = mongoose.connection
const todosData = require('./utilities/data')
const todosController = require ('./controller/todos')



// Environmental Varibles
const app = express();
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

// Connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true},
   () => console.log('MongoDB connection establish') )

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

// ROUTES
app.use('/todos', todosController)// telling server.js to get the routess from controllers/todos.js

// app.get('/todos', (req,res) => {
//     Todos.find({}, (err, allTodos) =>{
//         res.json(allTodos)
//     })
// })//ROUTE IS NO LONGER NEEDED BCUZ WE HAVE IT ON THE TODOS.CO

// SENDING TO THE DB
app.get('/seed', async (req, res) => {
    await Todos.deleteMany({});
    await Todos.insertMany(todosData);
    res.send('done!');
  });

app.listen(PORT, () => {
    console.log('This message means nothing', PORT)
  })