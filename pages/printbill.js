import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";
const PrintBill = () => {
  let componentRef = useRef();
  const router = useRouter();
  const { formData } = router.query;
  console.log(formData);
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setphone] = useState("");
  useEffect(() => {
    if (formData) {
      setData(JSON.parse(formData));
    }
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token) {
      setUser({ value: token, email: email });
      fetchuser(token);
      setKey(Math.random());
    } else {
      router.push("/");
    }
  }, [router.query, formData]);
  console.log(data);
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
  };
  const fetchuser = async (token) => {
    let data = { token: token };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let responce = await res.json();
    setName(responce.name);
    setAddress(responce.address);
    setGstin(responce.gstin);
    setPan(responce.pan);
    setphone(responce.phone);
  };
  return (
    <>
      <Navbar user={user} logout={logout} key={key} />
      <div className="p-8" ref={(el) => (componentRef = el)}>
        <div className="container mx-auto p-4">
          {/* First Row */}
          <div className="flex border">
            <div className="w-1/6 flex items-center justify-center">
              <img src="/home.jpg" alt="Home" className="h-8" />
            </div>
            <div className="w-5/6 border-l">
              <div className="flex h-full items-center p-2">
                <div className="w-1/2">
                  <p className="font-bold">Name : {name}</p>
                  <p className="font-bold">Business : Packers & Movers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex border justify-between">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">Address : {address}</p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">Email : {data?.email}</p>
              <p className="font-bold">Phone Number :{phone} </p>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex border">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">PAN Number : {pan}</p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">GSTIN Number : {gstin}</p>
            </div>
          </div>
          {/* Third Row */}
          <div className="flex border">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">
                {" "}
                Consignor Name : {data?.consignorName}
              </p>
              <p className="font-bold">
                {" "}
                Consignor Address : {data?.consignorAddress}
              </p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">Notice : {}</p>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex border">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">Lorry Number : {data?.lorryno}</p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">Date : {data?.date}</p>
            </div>
          </div>

          {/* Fifth Row */}
          <div className="flex border">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">From : {data?.from}</p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">To : {data?.to}</p>
            </div>
          </div>

          {/* Sixth Row */}
          <div className="flex border">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">
                Delivery Address : {data && data?.deliveryaddress}
              </p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">Distance : {data && data?.distance}</p>
            </div>
          </div>

          {/* Seventh Row */}
          {/* <div className=" mt-4 flex border border-black p-4">
            <div className="w-1/4 border-r p-2">
              <p className="font-bold">Package Name</p>
              <p>hi</p>
            </div>
            <div className="w-1/4 border-r p-2">
              <p className="font-bold">No.of Packages </p>
            </div>
            <div className="w-1/4 border-r p-2">
              <p className="font-bold">Weight</p>
            </div>
            <div className="w-1/4 border-r p-2">
              <p className="font-bold">Rate</p>
            </div>
          </div> */}

          <div className=" border ">
            <table className="w-full">
              <thead>
                <tr>
                  <th>No. of Packages</th>
                  <th>Description</th>
                  <th>Weight</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {/* Goods section */}
                {data &&
                  data?.goods.map((item, index) => (
                    <tr key={index} className="text-center w-full">
                      <td>{item.No_of_packages}</td>
                      <td>{item.Description}</td>
                      <td>{item.Weight}</td>
                      <td>{item.rate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Eighth Row */}
          <div className="flex border">
            <div className="w-1/4 flex flex-col border-r">
              <div className="flex-grow p-2">
                <p className="font-bold">Fright</p>
                <p className="font-bold">SGST</p>
                <p className="font-bold">CGST</p>
                <p className="font-bold">IGST</p>
                <p className="font-bold">Total : </p>
              </div>
            </div>
            <div className="w-1/4 flex flex-col border-r">
              <div className="flex-grow p-2">
                <p className="font-bold">
                  {data && data.freightRate ? data.freightRate : "---"}
                </p>
                <p className="font-bold">
                  {data && data.sgst ? data.sgst : "---"}
                </p>
                <p className="font-bold">
                  {data && data.cgst ? data.cgst : "---"}
                </p>
                <p className="font-bold">
                  {data && data.igst ? data.igst : "---"}
                </p>
                <p className="font-bold">
                  {data && data.total ? data.total : "---"}
                </p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex-grow p-2">
                <p className="font-bold">Issued by party/ urloading by party</p>
              </div>
            </div>
          </div>

          {/* Empty Row */}

          {/* Last Row */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 border-r p-2">
              <p className="font-bold">Service Tax Payable By</p>
              <p className="font-bold">Consignee &#9634;</p>
              <p className="font-bold">consignor &#9634;</p>
              <p className="font-bold">Transporter &#9634;</p>
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">Authorized Sign</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPrint className="mr-2" />{" "}
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef}
          />
        </button>
      </div>
    </>
  );
};

export default PrintBill;
