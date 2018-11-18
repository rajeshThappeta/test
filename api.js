var express=require("express");
var app=express();
var MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/admin';
 
//const util = require('util')

var bodyParser = require('body-parser')
//app.listen(4011)
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.static(__dirname + "/html"));
//app.use(express.static(__dirname + "/controllers"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

//admin Login 
app.get("/adminLogin",function(req,res){
      
	var userName=req.query.userName
	var password=req.query.password


 	
MongoClient.connect(mongoURL, function(err, db){

		
		var dataBase=db.db("hospital")
		var coll=dataBase.collection("admin")
		coll.find({"userName":userName,"password":password}).toArray(function(err,doc){
				if(doc[0]!=undefined){
					res.send("success")
					
				}else{
					res.send("error")
				}
		})
		db.close();
	
	})

})

//doctor Login
app.get("/doctorLogin",function(req,res){
	//variable creation
	var userName=req.query.userName
	var password=req.query.password
	MongoClient.connect(mongoURL, function(err, db) {
                 
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("doctors")
		coll.find({"userName":userName,"password":password}).toArray(function(err,doc){
				if(doc[0]!=undefined){
					res.send(doc)
					
				}else{
					res.send("error")
				}
		})
		db.close();
	})
});

//doctor Register
app.get("/doctorRegister",function(req,res){
	var dr={"userName":req.query.userName,"password":req.query.password,"fullName":req.query.fullName,
			"specialization":req.query.specialization,"age":req.query.age,"gender":req.query.gender}
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("doctors")
		//data insertion
		coll.findOne({"userName":dr.userName},function(err,doc){
			if(doc){
				res.send("user name already exists")
				console.log("user name already exists")
			}else{
				coll.insert(dr,function(err,doc){
					if(doc){
						res.send("success")
					}else{
						res.send("error")
					}
					db.close();
				})
			}
		})
		
	})
})
//patient Register
app.get("/patientRegister",function(req,res){
	//variable creation
	var patient={"userName":req.query.userName,"password":req.query.password,"fullName":req.query.fullName,
						"mobileNo":req.query.mobileNo,"disease":req.query.disease,"age":req.query.age,"gender":req.query.gender}
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("patients")
		//data insertion
		coll.findOne({"userName":patient.userName},function(err,doc){
			if(doc){
				console.log("user name already exists")
			}else{
				coll.insert(patient,function(inerr,indoc){
					if(indoc){
						res.send("success")
						
					}else{
						res.send("error")
					}
					db.close();
				})
			
			}
			
		})
		
	})
	
})
//patient Login
app.get("/patientLogin",function(req,res){
	//variable creation
	var userName=req.query.userName
	var password=req.query.password
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("patients")
		coll.find({"userName":userName,"password":password}).toArray(function(err,doc){
			if(doc[0]!=undefined){
				res.send(doc)
			}else{
				res.send("error")
			}
		})
		db.close();
	})
});

app.post("/doctorHome",function(req,res){
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("patients")
		coll.find().toArray(function(err,doc){
			if(doc){
				res.send(doc)
			}else{
				res.send("error")
			}
		})
		db.close();
		
	})

});
app.post("/adminHome1",function(req,res){
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("patients")
		coll.find().toArray(function(err,doc){
			if(doc){
				res.send(doc)
			}else{
				res.send("error")
			}
		})
		db.close();
		
	})

});
app.post("/adminHome2",function(req,res){
	MongoClient.connect(mongoURL, function(err, db) {
		//data base object creation
		var dataBase=db.db("hospital")
		//collections object creation
		var coll=dataBase.collection("doctors")
		coll.find().toArray(function(err,doc){
			if(doc){
				res.send(doc)
			}else{
				res.send("error")
			}
		})
		db.close();
		
	})

});


 var Api = app.listen(4000, function() {
       
        console.log('Server started.......');
    })