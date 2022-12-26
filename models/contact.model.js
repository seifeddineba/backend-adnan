const mongoose = require('mongoose');
const Joi=require('joi')

const Schema= mongoose.Schema;


const contactSchema = new Schema({
        nomPrenom: {type: String, default: ""},
        email: {type: String, default: ""},
        phone: {type: String, default: ""},
        message: {type: String, default: ""},
  },
  {
       timestamps: true 
  },)
  
 function validateContact(Contact){


    
    const schema=Joi.object({
        nomPrenom: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        message: Joi.string().required(), 
    })

    return schema.validate(Contact)
}

  const Contact = mongoose.model('Contact',contactSchema);

  module.exports.Contact = Contact;
  module.exports.validateContact=validateContact