// paths structure CRUD blue print
// NAME -- VERB/path / purpose
// INDEX -- GET/comments - list/display all comments
// NEW -- GET/comments/new  - form to create a new comment
// CREATE -- POST/comments - Create a new Comment on server
// SHOW --  GET/comments/:id - Get one specific Comment / display details of specific comment
// EDIT -- GET/comments/:id/edit - Form to Update one specific Comment
// UPDATE -- PATCH/comments/:id - Updates specific comment on server 
// DESTROY -- DELETE/comments/:id - Delete/Destroy one Comment on server

// UUID - To create a random UUID use it with uuidv4();
// FYI you can change the name uuidv4 to anything you like
const { v4: uuidv4 } = require('uuid');

// boilerplate setting begin
const express = require('express');
const app = express();
const path = require('path');
// METHOD OVERRIDE needs to be installed for editing single values like comments as an example
// since we cannot send a PATCH/PUT/DELETE requests from the browser, we must OVERRIDE it!
// we can only send GET/POST requests, METHOD-OVERRIDE allows us to use these verbs where the client
// doesnt support them!
// we can override using a query value or we can also set a request HTTP HEADER
// <form action="/comments/<%= comment.id %>/?_method=PATCH" method="post">
// setting METHOD_OVERRIDE 
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // _method is a convention but you can use any name

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.set('views' , path.join(__dirname,'views'));
app.set('view engine', 'ejs');
// boilerplate settings end

// setting an array of data
const comments = [
    {
        username:'elliot',
        comment:'never stop hustling!',
        id:uuidv4(),
    },{
        username:'mike',
        comment:'never quit',
        id:uuidv4(),
    },{
        username:'eminem',
        comment:'lose yourself!',
        id:uuidv4(),
    },{
        username:'future',
        comment:'you should have never doubted me!',
        id:uuidv4(),
    },

];
// CRUD boilerpalte and basics
// seting routes according to the pattern above
//INDEX route that displays comments 
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
});
//NEW route to add new comments displays the form 
app.get('/comments/new', (req,res)=>{
    res.render('comments/new')
});
//CREATE post the data from the form and redirect the user to the comments display page 
app.post('/comments', (req,res)=>{
    const {username , comment} = req.body;
    comments.push({username,comment, id:uuidv4()})
    // the redirect method generates a status code of 302 by default and the response will also include 
    // the path (/comments) in the HEADER which the browser will use to make a new request
    res.redirect('/comments');
});
// SHOW dispaly a specific comment by requesting the comments id 
app.get('/comments/:id', (req,res)=>{
    const {id} = req.params;
    // we get the id from the URL params and use the find method on the data we have to return that object
    // we used parseInt here to parse the id to an integer
    const comment = comments.find(c=> c.id === id);
    res.render('comments/show', {comment});
});
// UPDATE -- PATCH edit a single comment
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c=> c.id === id);
    res.render('comments/edit', {comment});
})
// we dont want to edit the id in this case, what we want to do is only edit the comment itself
// the PATCH method is used to apply partial mods to a resource 
// alternatively the PUT method (often to be confused with patch) repalces all current representations of the target resource with the request payload
// in postman you can test patch requests
// 
app.patch('/comments/:id',(req,res)=>{
    // res.send('udate') // before writing the following lines of code we can try this one in postman as a patch request and check it first
    const {id} = req.params; // we take the id from the URL
    const newCommentText = req.body.comment; // we take the new text -the payload
    const editComment = comments.find(c=> c.id === id); // find the comment to update 
    editComment.comment = newCommentText; // set the value of the property to new prop
    res.redirect('/comments')

})
// listening port - part of the boilerplate
app.listen(3000,()=>{
    console.log('comments app is running');
});