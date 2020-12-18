const express=require('express')
const app=express();
const PORT=process.env.PORT||3001;
const cors=require('cors');
const mongoose=require('mongoose');
const FriendModel=require('./models/Friends');
app.use(cors());
app.use(express.json());
//DATABASE CONNECTION
mongoose.connect(
    "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {useNewUrlParser:true}
);
app.get('/',(req,res)=>{
    res.send('Home Page')
})
app.post('/addfriend',async(req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const Desc=req.body.Desc;
    const friends=new FriendModel({name:name,age:age,description:Desc});
    await friends.save();
    res.send('Inserted Friend SuccesFully');
})

app.get('/read',async(req,res)=>{
   await FriendModel.find({},(err,result)=>{
    if(err){
        res.send(err)
    }
    else{
        res.send(result);
    }
   })
})
app.put('/update',async(req,res)=>{
  const newAge=req.body.newAge
  const id=req.body.id
  try{
     await FriendModel.findById(id,(error,friendUpdate)=>{
         friendUpdate.age=Number(newAge);
         friendUpdate.save();
     });
  }
  catch(err){
console.log(err);
  }
  res.send("updated");
})
app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
await FriendModel.findByIdAndRemove(id).exec()
res.send('item deleted ');
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})