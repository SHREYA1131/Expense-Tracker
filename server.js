// import env from './env'
require('dotenv').config()
const express = require('express');
const dbConnect=require('./dbConnect')
const app = express();
app.use(express.json());
const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users/', userRoute);
app.use('/api/transactions/' , transactionsRoute)

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Started on port ${port}!`))