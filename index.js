const express=require('express')
const app=express()
const dataservice=require('./services/dataservice')
const cors=require('cors')
const path=require('path')
var multer  = require('multer')
app.listen(3000,()=>{
    console.log("Server started at port 3000")
})
app.use(express.json())
app.use(cors({
  origin:"http://localhost:4200",
}))
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './cv')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.send("This is a Get method")
})
app.post('/submit',(req,res)=>{
  dataservice.submit(req.body.empid,req.body.ename,req.body.age,req.body.gender,req.body.joindate,req.body.interests,req.body.languages,req.body.filename)
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
app.post('/uploadFile',upload.single('file'),(req,res)=>{
  console.log(req.file.filename);
 res.json({status:true,message:"success",filename:req.file.filename})
})
app.get('/download/:file(*)',(req,res)=>{
  console.log(req.params.file);
  const file=req.params.file
  const fileLocation=path.join('./cv',file)
  console.log(fileLocation);
  res.download(fileLocation,file)
})