// import env from './env'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const dbConnect=require('./dbConnect')
const path = require('path')
const app = express();
app.use(express.json());
const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute')
app.use('/api/users/', userRoute);
app.use('/api/transactions/' , transactionsRoute)

const port = 5000 || process.env.PORT;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => console.log(`Started on port ${port}!`))