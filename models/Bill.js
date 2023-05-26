// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
const BillSchema = new mongoose.Schema(
  {
    email: { type: String },
    bill_id: { type: String },
    consignorName: { type: String },
    consignorAddress: { type: String },
    date: { type: String },
    from: { type: String },
    to: { type: String },
    distance: { type: String },
    freightRate: { type: String },
    cgst: { type: String },
    sgst: { type: String },
    total: { type: String },
    goods: [
      {
        Package_name: { type: String },
        No_of_packages: { type: String },
        Description: { type: String },
        Weight: { type: String },
        rate: { type: String },
      },
    ],
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Bill", BillSchema);
// export default mongoose.model.User || mongoose.model("User", UserSchema);
