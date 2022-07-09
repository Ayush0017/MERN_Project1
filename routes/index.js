var express = require('express');
var router = express.Router();
var indexModel = require('../models/indexModel')
var sendMail = require('./mailAPI')

/* middleware function to destry user session */
router.all((req, res, next)=>{
	req.session.sunm=undefined
	req.session.srole=undefined	
	next()		
});


/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index');
});

router.get('/about', (req, res, next)=>{
  res.render('about');
});

router.get('/contact', (req, res, next)=>{
  res.render('contact');
});

router.get('/service', (req, res, next)=>{
  res.render('service');
});

router.get('/register', (req, res, next)=>{
  res.render('register',{'output':''});
});

router.post('/register', (req, res, next)=>{
  //console.log(req.body)
  indexModel.registerUser(req.body).then((result)=>{
  	if(result)
  	{
  		sendMail(req.body.email,req.body.password)	
  		msg="User registered successfully...."
  	}
  	else	
  		msg="User already exists , please try with new"
  	res.render('register',{'output':msg});
  }).catch((err)=>{
  	console.log(err)
  })
});


router.get('/checkEmail', (req, res, next)=>{
  var emailid=req.query.emailid
  indexModel.checkEmail(emailid).then((result)=>{
  	res.send(result)
  }).catch((err)=>{
	console.log(err)  
  })
});


router.get('/verifyUser', (req, res, next)=>{
  var email=req.query.email
  indexModel.verifyUser(email).then((result)=>{
	res.redirect('/login')	
  }).catch((err)=>{
	console.log(err)  
  })
});

router.get('/login', (req, res, next)=>{
  res.render('login',{'output':''});
});
router.post('/login', (req, res, next)=>{
  indexModel.userLogin(req.body).then((result)=>{
  	
  	if(result.length==0)
  	{
  		res.render('login',{'output':'Invalid user , or authenticate your account....'});
  	}
  	else
  	{
  		//to store user details in session
  		req.session.sunm = result[0].email
  		req.session.srole = result[0].role	 
  		
  		if(result[0].role=="user")
  			res.redirect('/users')
  		else
  			res.redirect('/admin')		
  	}	
  		
  }).catch((err)=>{
  	console.log(err)
  })
});




module.exports = router;
