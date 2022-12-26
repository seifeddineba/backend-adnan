const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    tripType: { type: String, default: "" },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    startDate: { type: Date, default: "" },
    returnDate: { type: Date, default: "" },
    timeStart: { type: String, default: "" },
    timeReturn: { type: String, default: "" },
    carInfo: {
      type: { type: String, default: "" },
      price: { type: Number, default: 0 },
    },
    userInfo: {
      nom: { type: String , default: ""},
      prenom: { type: String, default: "" },
      paymentType: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      message: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

function validateReservation(Reservation) {
  const schema = Joi.object({
    tripType: Joi.string().required(),

    from: Joi.string().required(),
    to: Joi.string().optional().allow(""),
    startDate: Joi.date().required(),
    returnDate: Joi.date().optional().allow(""),
    timeStart: Joi.string().required(),
    timeReturn: Joi.string().optional().allow(""),
    carInfo: Joi.object().keys({
      type: Joi.string().required(),
      price: Joi.number().required(),
    }),
    userInfo: Joi.object().keys({
      nom: Joi.string().optional().allow(""),
      email: Joi.string().optional().allow(""),
      message: Joi.string().optional().allow(""),
      prenom: Joi.string().required(),
      phone: Joi.string().required(),
      paymentType: Joi.string().required(),
    })
  });

  return schema.validate(Reservation);
}

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.Reservation = Reservation;
module.exports.validateReservation = validateReservation;
