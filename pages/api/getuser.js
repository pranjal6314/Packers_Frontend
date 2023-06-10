import User from "../../models/User";
import Bill from "../../models/Bill";
import connectDb from "../../middleware/monooges";
var CryptoJS = require("crypto-js");
import jsonewebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let token = req.body.token;
    const user = jsonewebtoken.verify(token, "ourkey");
    let dbuser = await User.findOne({ email: user.email });
    const { name, address, phone, email, pin, gstin, pan, image } = dbuser;
    res
      .status(200)
      .json({ name, address, phone, email, pin, gstin, phone, pan, image });
  } else {
    res.status(400).json({ success: false, error: "no user found" });
  }
};

export default connectDb(handler);
