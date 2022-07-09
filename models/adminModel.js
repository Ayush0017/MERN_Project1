var db = require('./connection')

function adminModel()
{
	this.fetchUsers=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').find({'role':'user'}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})					
	}
	
	
	this.manageuserstatus=(urldata)=>{
		return new Promise((resolve,reject)=>{
			if(urldata.s=='block')
			{
				db.collection('register').updateOne({'_id':parseInt(urldata.regid)},{$set:{'status':0}},(err,result)=>{
					err ? reject(err) : resolve(result);
				})
			}
			else if(urldata.s=='verify')
			{
				db.collection('register').updateOne({'_id':parseInt(urldata.regid)},{$set:{'status':1}},(err,result)=>{
					err ? reject(err) : resolve(result);
				})
			}
			else
			{
				db.collection('register').deleteOne({'_id':parseInt(urldata.regid)},(err,result)=>{
					err ? reject(err) : resolve(result);
				})
			}
		})	
	}
	
	
	this.paymentdetails=()=>{
		return new Promise((resolve,reject)=>{
			db.collection('payment').find().toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})					
	}
	
	
		this.cpadmin=(sunm,pDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection("register").find({'email':sunm,'password':pDetails.opass}).toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					if(result.length==0)
						resolve(0)
					else
					{
						if(pDetails.npass!=pDetails.cnpass)
							resolve(1)
						else
						{
							db.collection("register").updateOne({'email':sunm},{$set:{'password':pDetails.cnpass}},(err1,result1)=>{
				err1 ? reject(err) : resolve(2);  
							})							
						}		
					}			
				}	  
			})	
		})			
	}
	
	this.fetchDetails=(email)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').find({'email':email}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}	
	
	this.editprofile=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').updateOne({'email':userDetails.email},{$set:{'name':userDetails.name,'address':userDetails.address,'dob':userDetails.dob,'mobile':userDetails.mobile,'city':userDetails.city,'gender':userDetails.gender}},(err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})				
	}
}

module.exports=new adminModel()















