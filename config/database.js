const mongoose = require('mongoose');

const dbConnection =()=>{
    mongoose.connect("mongodb://localhost:27017/areeb")
    .then(() => console.log("Connected to areeb database"))
    .catch((err) => {console.error(`database error ${err}`)
    process.exit(1)});
    
}

module.exports = dbConnection;