require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const entryRouter = require('./routes/entryRoute')
const groceryRouter = require('./routes/groceryRoute')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(cors({
  origin: 'https://dataentry-wotc.onrender.com',
  credentials: false 
}));

app.get('/',(req,res)=>{
    res.send("Home page")
})
app.use('/api/data',entryRouter)
app.use('/api/data',groceryRouter)



app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})

