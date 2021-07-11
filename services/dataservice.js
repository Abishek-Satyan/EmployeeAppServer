const db=require('./db')
const submit=(empid,ename,age,gender,joindate,interests,languages)=>{
    return db.Employee.findOne({empid})
    .then(employee=>{
    if(employee){
        return{
            statusCode:422,
            status:false,
            message:"Employee already exist"
        }    
    } 
    else{
        const newEmployee=new db.Employee({
            empid,
            ename,
            age,
            gender,
            joindate,
            interests,
            languages
        })
        newEmployee.save();
        return{
            statusCode:200,
            status:true,
            message:"Employee details added"
        }
    }   
    })
}
const edit=(empid,ename,age,gender,joindate,interests,languages)=>{
    return db.Employee.findOne({empid})
    .then(employee=>{
        if(employee){
            employee.ename=ename
            employee.age=age
            employee.gender=gender
            employee.joindate=joindate
            employee.interests=interests
            employee.languages=languages
            employee.save()
            return{
                statusCode:200,
                status:true,
                message:"Employee details edited successfully"
            }
        }
        else{
            return{
                statusCode:422,
                status:false,
                message:"Employee doesnot exist"
            }    
        }
    })
}
const getdata=()=>{
    return db.Employee.find({}).then(result=>{
       
            const empdetails=result
            console.log(empdetails);
            return{
                statusCode:200,
                status:true,
                message:"Employee details collected",
                data:empdetails
            }
    
       
    })
}
const deletedata=(empid)=>{
 return db.Employee.deleteOne({empid}).then(result=>{
    return{
        statusCode:200,
        status:true,
        message:"Employee details Deleted"
    }   
 })
}
module.exports={
    submit,
    edit,
    getdata,
    deletedata
}