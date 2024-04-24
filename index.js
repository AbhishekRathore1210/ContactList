const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    { 
        name:"Abhishek Rathore",
        phone:"8619455649"
    },
    {
        name:"Yash Patel",
        phone:"4353245435"
    }
]

app.get('/',function(req,res){

    Contact.find({}).then((cnt)=>{
        // console.log('*****',cnt);
        return res.render('home',{
            title:"My Contact list",
            contact_list:cnt
        })}).catch((err)=>{
            console.log(err);
        })
})

app.get('/submitted',function(req,res){

    return res.render('submit',{
        title:"Form Submission"
    })
})

app.get('/about',function(req,res){
    return res.render('about',{title:"This is About Page"});    
})

app.post('/form',function(req,res){
    // console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // Contact.create({
    //       name:req.body.name,
    //       phone:req.body.phone
    // },function(err,newContact){
    //     if(err){
    //         console.log('error in creating a contact');
    //         return;
    //     }
    //     console.log("******",newContact);
    //     return res.redirect('back');
    // })

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then( (newContact) => {
        console.log("*******", newContact);
        return   res.redirect('back');
    }).catch((err) => {
        console.error(err);
    })
    
})

app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    let id = req.query.id;
    Contact.findByIdAndDelete(id).catch((err)=>{
        console.log(err);
    })
    return res.redirect('back');
})


app.listen(port,function(err){
    if(err){
        console.log("Error in running server");
    }
    console.log("Server is running");
})