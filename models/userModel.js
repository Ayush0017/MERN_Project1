var db = require('./connection')

function userModel()
{
	this.payment=(pDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('payment').find().toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					var _id
					if(result.length==0)
						_id=1
					else
					{
						var max_id=result[0]._id
						for(let row of result)
						{
	 						if(row._id>max_id)
						 		max_id=row._id
						}
						_id=max_id+1  	
					}
					pDetails._id=_id
					pDetails.info=Date()

					db.collection('payment').insertOne(pDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(result);
					 	})	
					}
			})
			
		})	
	}
}

module.exports=new userModel()















