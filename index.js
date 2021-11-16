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
    try {
      const user = req.body
      // using the request body to generate token which will expire after 360s 
      jwt.sign({user}, cfg.TOKEN_SECRET, { expiresIn: '360s' }, (err, token) => {
        //shipping web token to client as response
        res.json({token});
      });
    } catch (error) {
      res.status(500).send({message:'token genration failed'})
    }
   
  });
 
// private routess // route that can only be access after client provide a valid token
app.get('api/', validatintToken, (req, res) =>{
 res.send({message:'Hey you made it'})
});
//jason patcher endpoint 
app.post('/api/jsonpatch', validatintToken, (req,res) => {
    try {
      //applying patch to object
        jsonpatch.apply(req.body.jsonObject,req.body.jsonPatch);
        res.json({
            Patched: req.body.jsonObject
        });
      
    } catch (error) {
      res.status(401).send({message:'bad request'})
    }
});

//endpiont for resizing image
app.post('/api/image', validatintToken, imageResizer, (req,res) => {
});


app.listen(cfg.LISTEN_PORT, function(){
    console.log(`app listening on ${cfg.LISTEN_PORT}`);
});
