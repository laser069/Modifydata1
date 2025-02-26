const express = require("express")
const Menu = require("./schema")
const router = express.Router()

router.use(express.json())

router.post('', async (req,res)=>{
    try{
        const {name,description,price} = req.body;
        const menuItem =new Menu ({
            name:name,
            description:description,
            price:price,
        })
    menuItem.save()
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

router.get('',async(req,res)=>{
    return res.status(200).json({"MenuItem":Menu.find()})
})

module.exports = router