import User from "../../models/User";
import Bill from "../../models/Bill";
import connectDb from "../../middleware/monooges";
var CryptoJS = require("crypto-js");
import jsonewebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let token = req.body.token;
    const user = jsonewebtoken.verify(token, "ourkey");
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        name: req.body.name,
        address: req.body.address,
        pin: req.body.pin,
        phone: req.body.phone,
        pan: req.body.pan,
        gstin: req.body.gstin,
        image: req.body.image,
      }
    );
    const { name, address, phone, email, pin, gstin, pan, image } = dbuser;
    res.status(200).json({
      name,
      address,
      phone,
      email,
      pin,
      gstin,
      pan,
      image,
      success: true,
    });
  } else {
    res.status(400).json({ success: false, error: "no user found" });
  }
};

export default connectDb(handler);
