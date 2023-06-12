import User from "../../models/User";
import Bill from "../../models/Bill";
import connectDb from "../../middleware/monooges";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let bill = new Bill({
      email: req.body.email,
      bill_id: req.body.bill_id,
      consignorName: req.body.consignorName,
      consignorAddress: req.body.consignorAddress,
      consigneeGst: req.body.consigneeGst,
      date: req.body.date,
      from: req.body.from,
      to: req.body.to,
      // pan: req.body.pan,
      // gstin: req.body.gstin,
      lorryno: req.body.lorryno,
      // phoneno: req.body.phoneno,
      deliveryaddress: req.body.deliveryaddress,
      distance: req.body.distance,
      freightRate: req.body.freightRate,
      cgst: req.body.cgst,
      sgst: req.body.sgst,
      igst: req.body.igst,
      total: req.body.total,
      goods: req.body.goods,
    });
    await bill.save();
    res.status(200).json({ success: true, data: req.body });
  } else {
    res.status(200).json({ success: false, error: "no user found" });
  }
};

export default connectDb(handler);
