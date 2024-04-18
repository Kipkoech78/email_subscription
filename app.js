const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    

});
app.post("/",function(req, res){
    const firstname= req.body.firstname;
    const lastname= req.body.secondname;
    const emailget= req.body.emailget;



    const data ={
        members:[
            {
                email_address:emailget,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
//read mdn documentation for more info on option on https  (nodejs.org)(https.request)

    const url ="https://us22.api.mailchimp.com/3.0/lists/b0c58e0b7c";
    const options ={
        method:"POST",
        auth: "kipkoech78:77e6ad8b82f435a1124c4768577e54a4-us22"

    }
    const request = https.request(url, options, function(response){

        if (response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");


        };
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});
app.get("/failure",function(req,res){
    res.redirect("/");

})



app.listen(process.env.PORT || 3000,function(){
console.log("server is running on port 3000.")
});



// api key

// 77e6ad8b82f435a1124c4768577e54a4-us22


// unique id b0c58e0b7c