const mongoose = require('mongoose');

//connect the database
mongoose.connect('mongodb://localhost:27017/contacts_list_db');

// aquire the connection
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running
db.once('open',function(){
    console.log("Successfully connected to the database");
})