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

    const bytes = CryptoJS.AES.decrypt(dbuser.password, "sec1234");
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (
      decryptedData === req.body.password &&
      req.body.newpassword === req.body.confirmPassword
    ) {
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.confirmPassword,
            "sec1234"
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    }
    res.status(200).json({ success: false, error: "wrong password" });
  } else {
    res.status(400).json({ success: false, error: "no user found" });
  }
};

export default connectDb(handler);
