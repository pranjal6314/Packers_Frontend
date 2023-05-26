import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import jsonewebtoken from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const home = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
      // const data = jsonewebtoken.verify(token, "ourkey");
      // setEmail(data.email);
    } else {
      router.push("/");
    }
  }, [router.query]);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
  };

  const [rows, setRows] = useState([
    {
      packageName: "",
      numOfPackages: "",
      description: "",
      weight: "",
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
        packageName: "",
        numOfPackages: "",
        description: "",
        weight: "",
        rate: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: "admin@gmail.com",
      bill_id: Math.floor(Math.random() * Date.now()),
      consignorName: document.getElementById("consignorName").value,
      consignorAddress: document.getElementById("consignorAddress").value,
      date: document.getElementById("date").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      distance: document.getElementById("distance").value,
      freightRate: document.getElementById("freightRate").value,
      cgst: document.getElementById("cgst").value,
      sgst: document.getElementById("sgst").value,
      total: document.getElementById("total").value,
      goods: rows,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let responce = await res.json();
    if (responce.success) {
      localStorage.setItem("token", responce.token);
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
    document.getElementById("distance").value = "";
    document.getElementById("freightRate").value = "";
    document.getElementById("cgst").value = "";
    document.getElementById("sgst").value = "";
    document.getElementById("total").value = "";

    setRows([
      {
        packageName: "",
        numOfPackages: "",
        description: "",
        weight: "",
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
          <label className="block mb-1 font-semibold" for="consignor_name">
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
          <label className="block mb-1 font-semibold" for="consignor_address">
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
          <label className="block mb-1 font-semibold" for="date">
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
          <label className="block mb-1 font-semibold" for="from">
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
          <label className="block font-semibold mb-2" for="to">
            To
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="to"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2" for="distance">
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
          <label className="block font-semibold mb-2" for="freightRate">
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
          <label className="block font-semibold mb-2" for="cgst">
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
          <label className="block font-semibold mb-2" for="sgst">
            SGST
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            id="sgst"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-semibold mb-2" for="total">
            Total
          </label>
          <input
            class="w-full px-3 py-2 border rounded"
            type="text"
            id="total"
            required
          />
        </div>

        <div id="goodsSection" className="mb-4">
          {/* <table id="goodsTable" className="mb-4">
            <thead>
              <tr>
                <th className="px-3 py-2">Package Name</th>
                <th className="px-3 py-2">No. of Packages</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Weight</th>
                <th className="px-3 py-2">Rate</th>
              </tr>
            </thead>
            <tbody id="goodsTableBody">
              <tr>
                <td className="border px-3 py-2">
                  <input
                    type="text"
                    name="package_name[]"
                    className="w-full border-none"
                  />
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    name="no_of_packages[]"
                    className="w-full border-none"
                  />
                </td>
                <td className="border px-3 py-2">
                  <textarea
                    name="description[]"
                    className="w-full border-none"
                  ></textarea>
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="text"
                    name="weight[]"
                    className="w-full border-none"
                  />
                </td>
                <td className="border px-3 py-2">
                  <input type="text" name="rate[]" className="w-full border-none" />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            id="addRowBtn"
            className="bg-blue--500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Row
          </button>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button> */}
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
                      value={row.packageName}
                      onChange={(e) =>
                        handleChange(index, "packageName", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={row.numOfPackages}
                      onChange={(e) =>
                        handleChange(index, "numOfPackages", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={row.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={row.weight}
                      onChange={(e) =>
                        handleChange(index, "weight", e.target.value)
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
