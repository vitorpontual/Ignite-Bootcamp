const express = require('express');
const cors = require('cors');

const app = express();


function checkExistsUser(request, response, next){

}

app.use(cors());
app.use(express.json());


module.exports = app;
