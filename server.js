const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static("UI"));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/UI/auth/index.html'));
    });




app.listen(port,()=>{console.log(`Listen at port 3000`)});