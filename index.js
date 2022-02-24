// paths structure CRUD blue print
// NAME -- VERB/path / purpose
// INDEX -- GET/comments - list/display all comments
// NEW -- GET/comments/new  - form to create a new comment
// CREATE -- POST/comments - Create a new Comment on server
// SHOW --  GET/comments/:id - Get one specific Comment / display details of specific comment
// EDIT -- GET/comments/:id/edit - Form to Update one specific Comment
// UPDATE -- PATCH/comments/:id - Updates specific comment on server 
// DESTROY -- DELETE/comments/:id - Delete/Destroy one Comment on server

// boilerplate setting begin
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.set('views' , path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// boilerplate settings end

// setting an array of data
const comments = [
    {
        username:'elliot',
        comment:'never stop hustling!'
    },{
        username:'mike',
        comment:'never quit'
    },{
        username:'eminem',
        comment:'lose yourself!'
    },{
        username:'future',
        comment:'you should have never doubted me!'
    },

];
// seting routes
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
});

// listening port - part of the boilerplate
app.listen(3000,()=>{
    console.log('comments app is running');
})