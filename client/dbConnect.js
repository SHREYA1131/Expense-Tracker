const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sg:12ka442ka1@cluster0.sljbc.mongodb.net/sg-money', {
    useNewUrlParser: true, useUnifiedTopology: true
})

const connection = mongoose.connection
connection.on('error',err=>console.log(err))
connection.on('connected',()=>console.log('connected to db'))

