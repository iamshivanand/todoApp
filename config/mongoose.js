//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/task_list_db');
//acquire the connection (to check if connection is succesful)
const db=mongoose.connection;
//if error
db.on('error',console.error.bind(console,'error connecting to database'));

//no error up and running
db.once('open',function(){
    console.log('connected to database');
});