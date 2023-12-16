"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    birthDate: { type: Date, required: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    creditCards: [
      {
        cardNumber: {
          type: String,
          required: true,
          trim: true,
        },
        cardHolder: {
          type: String,
          required: true,
          trim: true,
        },
        expirationDate: {
          type: String,
          required: true,
          trim: true,
        },
        cvv: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    invoiceLink: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Customer", schema);
