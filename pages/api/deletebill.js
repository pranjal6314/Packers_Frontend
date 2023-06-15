import User from "../../models/User";
import Bill from "../../models/Bill";
import connectDb from "../../middleware/monooges";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let { billId } = req.body;
      billId = billId.toString();
      //console.log("billId");
      // Find the bill by bill_id and delete it
      const existingBill = await Bill.findOne({ bill_id: billId });
      //console.log("existingBill");
      if (existingBill) {
        // Delete the bill if it exists
        await Bill.findOneAndDelete({ bill_id: req.body.billId });

        res.status(200).json({
          success: true,
        });
      } else {
        res.status(404).json({ success: false, error: "Bill not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid request method" });
  }
};

export default connectDb(handler);
