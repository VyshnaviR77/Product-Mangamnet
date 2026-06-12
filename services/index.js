require('dotenv').config()
const express=require('express')
const cors=require('cors')

const router=require('./routes/router')
require('./dbConnection/db')

const productserver=express()
productserver.use(cors())
productserver.use(express.json())

productserver.use("/uploads",express.static('./uploads'))

productserver.use(router)

const PORT=process.env.PORT||5000
productserver.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})