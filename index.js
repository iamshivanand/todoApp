const express=require('express');
//we need to add path  for accessing the different modules
const path=require('path'); 
const port=8000;

//connecting the database
const db=require('./config/mongoose');
// acessing the database
const Task=require('./models/task');


//to get all the functionality of express
//usually the naming convention is app
// now app has all functionalities those are needed to run a server
const app=express();



app.use(express.static('./assets'));
//stting up the view engine 
app.set('view engine','ejs');
//setting the path of the view engine
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//middleware

//getting the request and giving back response
app.get('/',function(request,response){

    Task.find({}, function(err,tasks){
        if(err){
            console.log('error in fetching Tasks from the database');
            return;
        }
        return response.render('index',{
            tasks_list: tasks
        });
    });   
});

app.post('/create-task',function(request,response){
        Task.create({
            task: request.body.task,
            description:request.body.description,
            date:request.body.date
        },function(err,newTask){
            if(err){
                console.log('error in creating the Task');
                return;
            }
            console.log('hurray',newTask);
            return response.redirect('back');
            
        });
        // return response.redirect('back');
});

//for deleting the contact using id
app.get('/delete-task',function(request,response){
    //get the id from query in the url
    let id=request.query.id;
    
    // find the contact in the database using id abd delete it
    Task.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from the database ');
            return;
        }
        return response.redirect('back');
    });
});


//run the server
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('server is up on port: ',port);
}); 