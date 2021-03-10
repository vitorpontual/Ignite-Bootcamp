const express = require('express');
const cors = require('cors');
const router = require('./routes/index')

const app = express();


app.use(cors());
app.use(express.json());

const users = []
app.use((req, res, next) => {
   req.users = users
   next()
})

app.use(router)


module.exports = app;
