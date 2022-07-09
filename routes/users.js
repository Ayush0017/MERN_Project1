var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel')

/* middleware function to check users */
router.use((req, res, next)=>{
	if(req.session.sunm==undefined || req.session.srole!='user')
		res.redirect('/login')
	else
		next()		
});

/* GET users listing. */
router.get('/',(req, res, next)=>{
  res.render('userhome',{'sunm':req.session.sunm});
});


router.get('/funds',(req, res, next)=>{
  var PAYPAL_URL="https://www.sandbox.paypal.com/cgi-bin/webscr"
  var PAYPAL_ID="sb-qhkce8596949@business.example.com"
  //sb-oeyqs8670733@personal.example.com
  res.render('funds',{'sunm':req.session.sunm,"PAYPAL_URL":PAYPAL_URL,"PAYPAL_ID":PAYPAL_ID})
});


router.get('/payment',(req, res, next)=>{
  var pDetails=req.query
  userModel.payment(pDetails).then((result)=>{
  	res.redirect('/users/success')	  
  }).catch((err)=>{
  	console.log(err)
  })
});

router.get('/success',(req, res, next)=>{
  res.render('success',{'sunm':req.session.sunm});
});

router.get('/cancel',(req, res, next)=>{
  res.render('cancel',{'sunm':req.session.sunm});
});

module.exports = router;
