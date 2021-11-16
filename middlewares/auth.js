var cfg = require('../cfg');

// token che
function validatintToken(req, res, next) {
    // checking if token is present in request header
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'TokenMissing' });
    }
    var token = req.headers.authorization.split(' ')[1];
  
    var payload = null;
    try {
      payload = jwt.decode(token, cfg.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(403).send({ error: "TokenInvalid" });
    }
  
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ error: 'TokenNotValidAnymore' });
    }
    
        next();
  };






module.exports = validatintToken;