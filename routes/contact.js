const {Contact,validateContact} = require('../models/contact.model');
const router = require('express').Router();

router.route('/').get(async (req,res)=>{
    const {query} = req
    if(query && query.page && query.limit) {
    let total = await  Contact.find().count();
        Contact.find().limit(parseInt(query.limit)).skip((query.page -1) * parseInt(query.limit)).sort({createdAt: 'desc'}).exec()
        .then(contacts => res.json({
            total : total,
            items: contacts
        }))
        .catch(err => res.status(400).json('Error: '+ err));
    }else{
        let total = await  Contact.find().count();
        Contact.find().limit(9).skip(0).sort({createdAt: 'desc'}).sort({createdAt: 'desc'}).exec()
        .then(contacts => res.json({
            total : total,
            items: contacts
        }))
        .catch(err => res.status(400).json('Error: '+ err));
    }
})

router.post('/add-contact',async(req,res)=>{  
    const {error}=validateContact(req.body)
    if(error) return res.send({status:false,message:error.details[0].message})
 
try{
    
    const contact=new Contact({
        ...req.body
     })
     const result=await contact.save()
     contact.save().then(()=>res.json('contact added successfully')).catch(err=>res.status(400).json('Error: '+err));
   
}catch(err){res.status(500).json('Error: '+err)};
    
 
 })

 module.exports=router