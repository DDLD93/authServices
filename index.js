//application entry point

// importing  Packages
var express = require("express");
var jsonpatch = require('json-patch');
var cors = require("cors");
var cfg = require('./cfg');
var cookieParser = require('cookie-parser');
var validatintToken = require('./middlewares/auth');
var imageResizer = require('./middlewares/ImageResizer');
const jwt = require('jsonwebtoken');



// 3. Initialize the application 
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//intitializing body parser
app.use(express.json())


//routes and endpoint
app.post('/api/login', (req, res) => {
    // Mock user
    const user = req.body
  
    jwt.sign({user}, cfg.TOKEN_SECRET, { expiresIn: '360s' }, (err, token) => {
      res.json({
        token
      });
    });
  });
 
// private routess
app.get('/', validatintToken, (req, res) =>{
 res.send({message:'hi you made it'})
//coment
});
app.post('/api/jsonpatch', validatintToken, (req,res) => {
    jsonpatch.apply(req.body.jsonObject,req.body.jsonPatch);
    res.json({
        Patched: req.body.jsonObject
    });
});
app.post('/api/image', validatintToken, imageResizer, (req,res) => {
});


app.listen(cfg.LISTEN_PORT, function(){
    console.log(`app listening on ${cfg.LISTEN_PORT}`);
});
