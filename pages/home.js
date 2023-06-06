import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import jsonewebtoken from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const home = (props) => {
  console.log(props);
  const router = useRouter();
  const { formData } = router.query;
  console.log(formData);
  const [user, setUser] = useState({ value: null });
  const [myemail, setMyemail] = useState(null);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token) {
      setUser({ value: token, email: email });

      setMyemail(email);
      setKey(Math.random());
    } else {
      router.push("/");
    }
  }, [router.query]);
  console.log("user : ", user);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
  };

  const [rows, setRows] = useState([
    {
      Package_name: "",
      No_of_packages: "",
      Description: "",
      Weight: "",
      rate: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = (e) => {
    e.preventDefault();

    setRows([
      ...rows,
      {
        Package_name: "",
        No_of_packages: "",
        Description: "",
        Weight: "",
        rate: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: myemail,
      bill_id: Math.floor(Math.random() * Date.now()),
      consignorName: document.getElementById("consignorName").value,
      consignorAddress: document.getElementById("consignorAddress").value,
      date: document.getElementById("date").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      distance: document.getElementById("distance").value,
      lorryno: document.getElementById("lorryno").value,
      //
      deliveryaddress: document.getElementById("deliveryaddress").value,
      freightRate: document.getElementById("freightRate").value,
      cgst: document.getElementById("cgst").value,
      sgst: document.getElementById("sgst").value,
      igst: document.getElementById("igst").value,

      total: document.getElementById("total").value,
      goods: rows,
    };
    //   phoneno: document.getElementById("phoneno").value,
    // pan: document.getElementById("pan").value,
    // gstin: document.getElementById("gstin").value,
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let responce = await res.json();
    if (responce.success) {
      toast.success("your bill is successfully created!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push({
        pathname: "/printbill",
        query: { formData: JSON.stringify(formData) },
      });
    } else {
      toast.warn("Try again!", {
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

    // Reset form fields
    document.getElementById("consignorName").value = "";
    document.getElementById("consignorAddress").value = "";
    document.getElementById("date").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("lorryno").value = "";
    document.getElementById("distance").value = "";
    document.getElementById("phoneno").value = "";
    document.getElementById("deliveryaddress").value = "";
    document.getElementById("freightRate").value = "";
    document.getElementById("cgst").value = "";
    document.getElementById("sgst").value = "";
    document.getElementById("igst").value = "";
    document.getElementById("pan").value = "";
    document.getElementById("gstin").value = "";
    document.getElementById("total").value = "";

    setRows([
      {
        Package_name: "",
        No_of_packages: "",
        Description: "",
        Weight: "",
        rate: "",
      },
    ]);
  };
  return (
    <>
      <Navbar user={user} logout={logout} key={key} />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form id="myForm" className="max-w-lg mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Form</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="consignorName">
            Consignor Name
          </label>
          <input
            className="w-full px-3 py-2 border"
            type="text"
            id="consignorName"
            required
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
            className="w-full px-3 py-2 border"
            type="text"
            id="consignorAddress"
            required
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="to">
            To
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="to"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="phoneno">
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="phoneno"
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="deliveryaddress">
            Delivery Address
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="deliveryaddress"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="distance">
            Distance
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            id="distance"
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
          />
        </div>
        {/* <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="pan">
            PAN No
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="pan"
            required
          />
        </div> */}
        {/* <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="gstin">
            GSTIN
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="gstin"
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="freightRate">
            Freight Rate
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            id="freightRate"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="cgst">
            CGST
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            id="cgst"
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
            required
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
            required
          />
        </div>

        <div id="goodsSection" className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Goods</h2>
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
                        handleChange(index, "Package_name", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={row.No_of_packages}
                      onChange={(e) =>
                        handleChange(index, "No_of_packages", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={row.Description}
                      onChange={(e) =>
                        handleChange(index, "Description", e.target.value)
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
          </table>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={handleAddRow}
          >
            Add Row
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default home;
