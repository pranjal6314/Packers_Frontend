import User from "../../models/User";
import connectDb from "../../middleware/monooges";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, "sec1234");
      var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    } else {
      res.status(200).json({ success: false, error: "no user found" });
    }

    if (user) {
      if (
        req.body.email === user.email &&
        decryptedData === req.body.password
      ) {
        var token = jwt.sign({ email: user.email, name: user.name }, "ourkey");
        // , {
        //   expiresIn: "1h",
        // }
        res
          .status(200)
          .json({ token: token, success: true, email: user.email });
      } else {
        res.status(200).json({ success: false, error: "wrong credentials " });
      }
    }
  } else {
    res.status(200).json({ success: false, error: "no user found" });
  }
};

export default connectDb(handler);
