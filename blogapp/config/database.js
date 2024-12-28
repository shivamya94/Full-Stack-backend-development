const mongoose = require("mongoose");

require ("dotenv").config();

const connectWithDB = () => {
        mongoose.connect(process.env.DATABASE_URL,{
            // useNewUrlParser:true,
            // UseUifiedTopology:true,
        } )
        .then(console.log("DB Ka Connection is Successful"))
        .catch((error) => {
            console.log("Issue in DB Connection");
            console.log(error);
            process.exit(1)

        } )
    };

module.exports = connectWithDB;