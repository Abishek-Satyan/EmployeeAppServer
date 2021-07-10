const db=require('./db')
const submit=(ename,age,gender,joindate,interests,languages)=>{
    return db.Employee.findOne({ename})
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
const edit=(ename,age,gender,interests,languages)=>{
    return db.Employee.findOne({ename})
    .then(employee=>{
        if(employee){
            employee.ename=ename
            employee.age=age
            employee.gender=gender
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
module.exports={
    submit,
    edit,
    getdata
}