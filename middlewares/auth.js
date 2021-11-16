var cfg = require('../cfg');
const jwt = require('jsonwebtoken');
const moment = require('moment')
// token check and validation
module.exports = function validatintToken(req, res, next) {
    // checking if token is present in request header
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'TokenMissing' });
    }
    //dividing token into substrings
    var token = req.headers.authorization.split(' ')[1];
  
    var payload = null;
    try {
      //trying to generate payload using client token and jwt secret key
      payload = jwt.decode(token, cfg.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(403).send({ error: "TokenInvalid" });
    }
    //checking the expiry state of token 
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ error: 'TokenNotValidAnymore' });
    }
    
        next();
  };






