const mongoose=require('mongoose')
const connection_string=process.env.CONNECTION_STRING
mongoose.connect(connection_string).then(res=>{
    console.log("database connected to ProductServer");
    
}).catch(err=>{
    console.log("Connection failed in the server");
    
})