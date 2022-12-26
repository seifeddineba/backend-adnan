const {Reservation,validateReservation} = require('../models/reservation.model');
const router = require('express').Router();
const nodemailer = require("nodemailer");

/********************************************* */
const TOKEN = "eb7d87eb9e2eeeaeaf5abee1759b8d94";
const SENDER_EMAIL = "adnan@taxiservices.com";
const RECIPIENT_EMAIL = "recipient@email.com";

/********************************************* */

router.route('/').get(async (req,res)=>{
    const {query} = req
    if(query && query.page && query.limit) {
        
       let total = await  Reservation.find().count();
        Reservation.find().limit(parseInt(query.limit)).skip((query.page -1) * parseInt(query.limit)).sort({createdAt: 'desc'}).exec()
        .then(reservations => res.json({
            total : total,
            items : reservations
        }))
        .catch(err => res.status(400).json('Error: '+ err));
    }else{
       
            let total = await  Reservation.find().count();
             Reservation.find().limit(6).skip(0).sort({createdAt: 'desc'}).exec()
             .then(reservations => res.json({
                 total : total,
                 items : reservations
             }))
             .catch(err => res.status(400).json('Error: '+ err));
          
    }   
   
})

router.post('/add-reservation',async(req,res)=>{
   
     const {error}=validateReservation(req.body)
     
     if(error) return res.status(400).send({status:false,message:error.details[0].message})
 

     const reservation=new Reservation({
        ...req.body
     })
     const result=await reservation.save()
 
   
     reservation.save().then(()=>{
        res.json('reservation added successfully')
        sendMail ()
    }).catch(err=>res.status(400).json('Error: '+err));
     
 
     
 })

 async function sendMail (){
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a0a5b5be0b6aa0",
        pass: "562d84956f3eb9"
      }
    });

    let mailOptions = {
      from: "taxi-services",
      to: "adnan@taxiservices.fr",
      subject: "Taxi services ,réservation",
      html: `
                  <html style="margin: 0; padding: 0;">
                    <head>
                      <title>Taxi services </title>
                    </head>
                    <body style="margin: 0; padding: 0;">
                        <div style="margin: 10px auto; padding-left: 32px;">
                        <p style="color: black;">nouvelle réservation</p>
                        </div>
                    </body>
                         
                  </html>
                      `,
    };

    transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
    });
}

 module.exports=router