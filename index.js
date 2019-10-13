const express=require("express");
const app= express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const User=require("./models/data");
const Sub=require("./models/Subs");
const path=require("path");
const nodemailer=require("nodemailer");

//const cors=require("cors");




const config=require("./config/key");

const db=async()=>{
    await mongoose.connect(config.key,{useNewUrlParser:true});
   // const data=await User.find({}).exec().then(data=>console.log(data)).catch(err=>console.log(err))
}
db().catch(err=>console.log(err));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//app.use(cors)

app.use("/Admin",(req,res)=>{
   res.sendfile("./public/home.html")
})


app.get("/getData/:id",async(req,res)=>{
    const id=req.params.id;
    const response=await User.find({_id:id})
    res.status(200).send({success:true,data:response})
    
})



app.get("/userSubs",async(req,res)=>{
  // console.log("dgndfjkn")
    const response=await Sub.find({})

    res.status(200).send({success:true,data:response})
    
})


app.get("/userList",async(req,res)=>{
    // console.log("dgndfjkn")
      const response=await Sub.find({})
  
      res.status(200).send({success:true,data:response})
      
  })

app.get("/email",(req,res)=>{

    const transporter=nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: 'jaymehta4444@gmail.com',
        pass: "mathsscholar"
      }
    
    })
    
    
    
    var mailOptions = {
        from: 'jaymehta4444@gmail.com',
        to: 'jaymehtayds24@gmail.com',
        subject: 'Subscription Mail',
        text: 'We sre happy to give you great opportunity to subscribe to our seervices..!'
      };
    
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log("hi");
          //  alert("Email sent successfully!");
          res.status(200).send('Email sent: ' + info.response);
        }
      });




})




app.post("/offerEmail",(req,res)=>{
  console.log(req.body)
    const data=req.body;



    const transporter=nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: 'chouhanaryan444@gmail.com',
        pass: "Jay!@#123"
      }
    
    })
    
    
    
    var mailOptions = {
        from: '',
        to: 'chouhanaryan444@gmail.com',
        subject: 'offer Mail',
        text: `Congratulations user:${data.u1}.We value our customers a lot.So we bring you great...`
      };
    
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log("hi")
          res.status(200).send('Email sent: ' + info.response);
        }
      });




    
})





app.listen(3005,()=>{
    console.log("Port listening successfully on port:3005")
})
