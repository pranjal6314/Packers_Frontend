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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [consignorName, setConsignorName] = useState("");
  const [consignorAddress, setconsignorAddress] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [deliveryaddress, setdeliveryaddress] = useState("");
  const [distance, setDistance] = useState("");
  const [lorryno, setlorryno] = useState("");
  const [freightRate, setfreightRate] = useState("");
  const [cgst, setcgst] = useState("");
  const [igst, setigst] = useState("");
  const [sgst, setsgst] = useState("");
  const [total, settotal] = useState("");

  const editBill = (props) => {
    console.log(props);
    setconsignorAddress(props.consignorAddress);
    setConsignorName(props.consignorName);
    setDate(props.date);
    setFrom(props.from);
    setTo(props.to);
    setdeliveryaddress(props.deliveryaddress);
    setDistance(props.distance);
    setlorryno(props.lorryno);
    setfreightRate(props.freightRate);
    setcgst(props.cgst);
    setigst(props.igst);
    setsgst(props.sgst);
    settotal(props.total);

    setEdit(props.bill_id);
    setOpen2(true);
  };
  console.log(editData);
  const handleChange = (e) => {
    if (e.target.name == "consignorName") setConsignorName(e.target.value);
    else if (e.target.name == "consignorAddress")
      setconsignorAddress(e.target.value);
    else if (e.target.name == "date") setDate(e.target.value);
    else if (e.target.name == "from") setFrom(e.target.value);
    else if (e.target.name == "to") setTo(e.target.value);
    else if (e.target.name == "deliveryaddress")
      setdeliveryaddress(e.target.value);
    else if (e.target.name == "distance") setDistance(e.target.value);
    else if (e.target.name == "lorryno") setlorryno(e.target.value);
    else if (e.target.name == "freightRate") setfreightRate(e.target.value);
    else if (e.target.name == "cgst") setcgst(e.target.value);
    else if (e.target.name == "igst") setigst(e.target.value);
    else if (e.target.name == "sgst") setsgst(e.target.value);
    else if (e.target.name == "total") settotal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      consignorName,
      consignorAddress,
      date,
      from,
      to,
      deliveryaddress,
      distance,
      lorryno,
      freightRate,
      cgst,
      igst,
      sgst,
      total,
      id: editData,
    };

    // let data = { token: user.value, address, name, phone, gstin, pan };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatebill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    let responce = await res.json();
    // console.log(responce);
    if (responce.success) {
      toast.success("Your info updated !", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } else {
      toast.warn("Something going wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
                    name="consignorAddress"
                    value={consignorAddress}
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
                    value={date}
                    name="date"
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
                    value={from}
                    name="from"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="to">
                    To
                  </label>
                  <input
                    value={to}
                    name="to"
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
                    value={deliveryaddress}
                    id="deliveryaddress"
                    name="deliveryaddress"
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
                    value={distance}
                    id="distance"
                    name="distance"
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
                    name="lorryno"
                    onChange={handleChange}
                    value={lorryno}
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
                    name="freightRate"
                    value={freightRate}
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
                    name="cgst"
                    value={cgst}
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
                    name="igst"
                    id="igst"
                    onChange={handleChange}
                    value={igst}
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
                    name="sgst"
                    onChange={handleChange}
                    required
                    value={sgst}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="total">
                    Total
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded"
                    type="text"
                    name="total"
                    id="total"
                    onChange={handleChange}
                    required
                    value={total}
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
                    onClick={handleSubmit}
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
