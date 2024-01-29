const express = require("express");
const app = express("")
const PORT = process.env.PORT || 5000

const data = [
    {
    name:"vijyaya",
    age:"23",
    city:"vijayawada",
    status:"Married"
    },
    {
        name:"rani",
        age:"23",
        city:"geeta",
        status:"single"
    }
]

app.get("/",(req,res)=>{
    res.send(data)
})

app.listen(PORT,()=>{
    console.log(`Port is litining on ${PORT}`)
})