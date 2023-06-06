import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Bill from "@/models/Bill";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import mongoose from "mongoose";
import Link from "next/link";
import Home from "./home";
const style2 = {
  position: "absolute",
  height: "100%",
  overflow: "scroll",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
// import Modal from "@mui/material/Modal";
const Bills = () => {
  const router = useRouter();

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [bills, setBills] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [editData, setEdit] = useState({});
  useEffect(() => {
    const fetchBill = async (token) => {
      // console.log(token);
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allbills`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      let res = await a.json();
      // console.log(res.allbills);
      // setBills(res.allbills);
      setBills(res.allbills.reverse());
    };
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token) {
      setUser({ value: token, email: email });
      fetchBill(token);
      setKey(Math.random());
    } else {
      router.push("/");
    }
  }, [router.query]);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const editBill = (props) => {
    setEdit(props);
    setOpen2(true);
  };

  const [consignorName, setConsignorName] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setphone] = useState("");
  const handleChange = (e) => {
    if (e.target.name == "consignorName") setConsignorName(e.target.value);
    else if (e.target.name == "address") setAddress(e.target.value);
    else if (e.target.name == "phone") setphone(e.target.value);
    else if (e.target.name == "pan") setPan(e.target.value);
    else if (e.target.name == "gstin") setGstin(e.target.value);
    else if (e.target.name == "password") setPassword(e.target.value);
    else if (e.target.name == "newpassword") setnewPassword(e.target.value);
    else if (e.target.name == "confirmpassword")
      SetconfirmPassword(e.target.value);
  };
  return (
    <>
      <Navbar user={user} logout={logout} key={key} />
      <div className="container bg-slate-400 mx-auto">
        <h1 className="font-semibold text-center p-8">my bills</h1>
        <div className="items">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Consignor Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Consignor Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills?.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.consignorAddress}
                      </th>
                      <td className="px-6 py-4">{item.consignorName}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.total}</td>
                      <td className="px-6 py-4">
                        <Link
                          // pathname: "/printbill",
                          // pathname: `/printbill?id=${item.bill_id}`,
                          href={{
                            pathname: "/printbill",
                            query: { formData: JSON.stringify(item) },
                          }}
                          key={item.bill_id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          print
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => editBill(item)}
                          key={item.bill_id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div handleClose2={handleClose2}>
              <form id="myForm" className="max-w-lg mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Form</h2>
                <div className="mb-4">
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="consignorName"
                  >
                    Consignor Name
                  </label>
                  <input
                    name="consignorName"
                    className="w-full px-3 py-2 border"
                    type="text"
                    value={consignorName}
                    id="consignorName"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="consignorAddress"
                  >
                    Consignor Address
                  </label>
                  <input
                    value={editData && editData?.consignorAddress}
                    className="w-full px-3 py-2 border"
                    type="text"
                    id="consignorAddress"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="date">
                    Date
                  </label>
                  <input
                    className="w-full px-3 py-2 border"
                    type="date"
                    id="date"
                    value={editData && editData?.date}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="from">
                    From
                  </label>
                  <input
                    className="w-full px-3 py-2 border"
                    type="text"
                    id="from"
                    value={editData && editData?.from}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="to">
                    To
                  </label>
                  <input
                    value={editData && editData?.to}
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    id="to"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold mb-2"
                    htmlFor="deliveryaddress"
                  >
                    Delivery Address
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    value={editData && editData?.deliveryaddress}
                    id="deliveryaddress"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-semibold mb-2"
                    htmlFor="distance"
                  >
                    Distance
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="number"
                    value={editData && editData?.distance}
                    id="distance"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="lorryno">
                    Lorry Number{" "}
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    id="lorryno"
                    required
                    onChange={handleChange}
                    value={editData && editData?.lorryno}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold mb-2"
                    htmlFor="freightRate"
                  >
                    Freight Rate
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="number"
                    id="freightRate"
                    value={editData && editData?.freightRate}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="cgst">
                    CGST
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="number"
                    value={editData && editData?.cgst}
                    id="cgst"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="igst">
                    IGST
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="number"
                    id="igst"
                    onChange={handleChange}
                    value={editData && editData?.igst}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="sgst">
                    SGST
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="number"
                    id="sgst"
                    onChange={handleChange}
                    required
                    value={editData && editData?.sgst}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="total">
                    Total
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    id="total"
                    onChange={handleChange}
                    required
                    value={editData && editData?.total}
                  />
                </div>

                <div id="goodsSection" className="mb-4">
                  {/* <h2 className="text-xl font-semibold mb-4">Goods</h2>
                  <table className="w-full mb-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Package Name</th>
                        <th className="px-4 py-2">No. of Packages</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Weight</th>
                        <th className="px-4 py-2">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={row.Package_name}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "Package_name",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={row.No_of_packages}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "No_of_packages",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={row.Description}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "Description",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={row.Weight}
                              onChange={(e) =>
                                handleChange(index, "Weight", e.target.value)
                              }
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <input
                              type="text"
                              className="w-full px-2 py-1 border rounded"
                              value={row.rate}
                              onChange={(e) =>
                                handleChange(index, "rate", e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                  {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={handleAddRow}
                  >
                    Add Row
                  </button> */}
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connection.readyState) {
    //   if (!mongoose.connection[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let orders = await Bill.find({});
  return {
    props: { orders: JSON.stringify(orders) },
  };
}

export default Bills;
