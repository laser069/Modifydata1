const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
const Menu = require("./schema")

require("dotenv").config()
mongoose.connect(process.env.DB_URL).then(()=>{console.log("Connected database")}).catch(e=>console.log("Not Connected"))

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu', async (req,res)=>{
    try{
        const {name,description,price} = req.body;
        const menuItem =new Menu ({
            name:name,
            description:description,
            price:price,
        })
    await menuItem.save()
    .then(()=>
        res.status(201).json({"Item":menuItem})
    )
    .catch(e=>{
        return res.status(400).json({"Error":e})
    })



    }catch(e){
        console.log(e.message)
    }
})

app.get('/menu',async(req,res)=>{
  const data = await Menu.find()
    return res.status(200).json({"MenuItem":data})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
