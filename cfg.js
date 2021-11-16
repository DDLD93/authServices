// this is the configuration file
module.exports = {
    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/apijwt',
  
    // web token
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',
  
    // 3. Express listening  Port
    LISTEN_PORT: process.env.LISTEN_PORT || 4000
  };