const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/EmployeeApp',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
const Employee = mongoose.model('Employee',{
    empid:Number,
    ename:String,
    age:String,
    gender:String,
    joindate:Date,
    interests:[],
    languages:[],
    filename:String
})
module.exports={
    Employee
}