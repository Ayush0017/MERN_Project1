var db = require('./connection')

function indexModel()
{
	this.registerUser=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').find().toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					var _id
					var flag=0
					if(result.length==0)
						_id=1
					else
					{
						var max_id=result[0]._id
						for(let row of result)
						{

						 if(row._id>max_id)
						 	max_id=row._id
						
						 if(row.email==userDetails.email)
						 	flag=1							 	
						 	
						}
						_id=max_id+1  	
					}
					userDetails._id=_id
					userDetails.status=0
					userDetails.role="user"
					userDetails.info=Date()

					if(flag)
					{
						resolve(0)
					}
					else
					{
						db.collection('register').insertOne(userDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(1);
					 	})	
					}
				}	
			})
			
		})	
	}
	
	
	this.checkEmail=(emailid)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').find({ "email": { $regex: emailid + '.*' } }).toArray((err,result)=>{
				err ? reject(err) : resolve(result);  
			})	
		})			
	}
	
	this.verifyUser=(email)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').updateOne({'email':email},{$set:{'status':1}},(err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})					
	}
	
	this.userLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('register').find({'email':userDetails.email,'password':userDetails.password,'status':1}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})					
	}
}

module.exports=new indexModel()















