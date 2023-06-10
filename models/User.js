// getting-started.js
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    gstin: { type: String, default: "" },
    pin: { type: String, default: "" },
    pan: { type: String, default: "" },
    image: {
      type: String,
      default: "",
    },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },

    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", UserSchema);
// export default mongoose.model.User || mongoose.model("User", UserSchema);
