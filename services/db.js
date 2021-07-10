const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/EmployeeApp',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
const Employee = mongoose.model('Employee',{
    ename:String,
    age:String,
    gender:String,
    joindate:Date,
    interests:[],
    languages:[]
})
module.exports={
    Employee
}