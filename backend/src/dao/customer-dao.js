"use strict";

const mongoose = require("mongoose");
const Document = mongoose.model("Customer");

exports.get = async (search, page = 1, limit = process.env.LIMIT) => {
  let query = {};

  if (search) {
    query["fullName"] = { $regex: search, $options: "i" };
  }

  let queries = [
    Document.find(query)
      .skip(parseInt((page - 1) * limit))
      .limit(parseInt(limit))
      .sort({ created_at: -1 }),
    Document.countDocuments(query),
  ];
  let queriesResult = await Promise.all(queries);

  let res = {};
  res["result"] = queriesResult[0];
  res["totalDocs"] = queriesResult[1];
  res["totalPages"] = Math.ceil(queriesResult[1] / limit);

  return res;
};

exports.getById = async (id) => {
  let res = await Document.findById(id);
  return res;
};

exports.create = async (data) => {
  var document = new Document(data);
  const res = await document.save();
  return res;
};

exports.update = async (id, data) => {
  await Document.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.delete = async (id) => {
  await Document.findByIdAndDelete(id);
};
