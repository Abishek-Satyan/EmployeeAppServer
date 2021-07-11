const express=require('express')
const app=express()
const dataservice=require('./services/dataservice')
const cors=require('cors')
app.listen(3000,()=>{
    console.log("Server started at port 3000")
})
app.use(express.json())
app.use(cors({
  origin:"http://localhost:4200",
}))
app.get('/',(req,res)=>{
    res.send("This is a Get method")
})
app.post('/submit',(req,res)=>{
 dataservice.submit(req.body.empid,req.body.ename,req.body.age,req.body.gender,req.body.joindate,req.body.interests,req.body.languages)
 .then(result=>{
    res.status(result.statusCode).json(result)
  })
})
app.post('/edit',(req,res)=>{
    dataservice.edit(req.body.empid,req.body.ename,req.body.age,req.body.gender,req.body.joindate,req.body.interests,req.body.languages)
 .then(result=>{
    res.status(result.statusCode).json(result)
  })
  
})
app.post('/getdata',(req,res)=>{
  dataservice.getdata(req,res)
.then(result=>{
  res.status(result.statusCode).json(result)
})

})
app.post('/deletedata',(req,res)=>{
  dataservice.deletedata(req.body.empid)
.then(result=>{
  res.status(result.statusCode).json(result)
})

})