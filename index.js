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
// route that displays comments
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
});
// route to add new comments displays the form
app.get('/comments/new', (req,res)=>{
    res.render('comments/new')
});
// post the data from the form and redirect the user to the comments display page
app.post('/comments', (req,res)=>{
    const {username , comment} = req.body;
    comments.push({username,comment})
    // the redirect method generates a status code of 302 by default and the response will also include 
    // the path (/comments) in the HEADER which the browser will use to make a new request
    res.redirect('/comments');
});

// listening port - part of the boilerplate
app.listen(3000,()=>{
    console.log('comments app is running');
})