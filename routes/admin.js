var express = require('express');
var router = express.Router();
var adminModel = require('../models/adminModel')

/* middleware function to check admin users */
router.use((req, res, next)=>{
	if(req.session.sunm==undefined || req.session.srole!='admin')
		res.redirect('/login')
	else
		next()		
});

/*Middleware function to get user details*/
var pDetails,m="",f=""
router.use('/epadmin', (req, res, next)=>{
	adminModel.fetchDetails(req.session.sunm).then((result)=>{
		pDetails=result
		if(result[0].gender=="male")
			m="checked"
		else
			f="checked"		
		next()				
	}).catch((err)=>{
		console.log(err)
	})
});


/* GET users listing. */
router.get('/', (req, res, next)=>{
	res.render('adminhome',{'sunm':req.session.sunm});
});

router.get('/manageusers', (req, res, next)=>{
	adminModel.fetchUsers().then((result)=>{
		//console.log(result)
		res.render('manageusers',{'sunm':req.session.sunm,'result':result});		
	}).catch((err)=>{
		console.log(err)
	})
});

router.get('/manageuserstatus', (req, res, next)=>{
	adminModel.manageuserstatus(req.query).then((result)=>{
		res.redirect('/admin/manageusers')
	}).catch((err)=>{
		console.log(err)
	})
});


router.get('/paymentdetails', (req, res, next)=>{
	adminModel.paymentdetails().then((result)=>{
		var total_amount=0
		for(let row of result)
			total_amount+=parseInt(row.amount)	
		res.render('paymentdetails',{'sunm':req.session.sunm,'result':result,"total_amount":total_amount});		
	}).catch((err)=>{
		console.log(err)
	})
});

router.get('/cpadmin', (req, res, next)=>{
	res.render('cpadmin',{'sunm':req.session.sunm,'output':''});
});

router.post('/cpadmin', function(req, res, next) {
  adminModel.cpadmin(req.session.sunm,req.body).then((result)=>{

  	if(result==0)
  		msg="Invalid old password , please try again"
	else if(result==1)
		msg="New & confirm new password not matched"
	else
		msg="Password updated successfully"
  	res.render('cpadmin',{'sunm':req.session.sunm,'output':msg});
	
	}).catch((err)=>{
	console.log(err)
  })
});


router.get('/epadmin', (req, res, next)=>{
	res.render('epadmin',{'sunm':req.session.sunm,'pDetails':pDetails[0],'m':m,'f':f,'output':''});
});

router.post('/epadmin', (req, res, next)=>{
	adminModel.editprofile(req.body).then((result)=>{
		res.redirect('/admin/epadmin')	
	}).catch((err)=>{
		console.log(err)
	})
});


module.exports = router;










