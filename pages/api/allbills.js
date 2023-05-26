import bill from "../../models/Bill";
import dbConnect from "../../middleware/monooges";
import jsonewebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jsonewebtoken.verify(token, "ourkey");
  console.log(data);
  let allbills = await bill.find({ email: data.email });
  res.status(200).json({ allbills });
};
export default dbConnect(handler);
