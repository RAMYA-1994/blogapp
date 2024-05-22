const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/db')
//env config
dotenv.config()
//route import
const userRoutes=require('./routes/UserRoutes')
const blogRoutes=require('./routes/blogRoutes') 
//mongo db connect
connectDB();
//rest object
const app =express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//routs
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes)
const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
    // console.log(PORT)
    console.log(`server running on ${ process.env.DEV_MODE} mode prt no ${PORT}`.bgCyan.white);
})