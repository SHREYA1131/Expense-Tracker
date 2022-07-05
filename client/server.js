const express = require('express');
const dbConnect=require('./dbConnect')
const app = express();
app.use(express.json());
const userRoute = require('./routes/usersRoute');
app.use('/api/users/', userRoute);
const port = 5000;

app.listen(port, () => console.log(`Started on port ${port}!`))