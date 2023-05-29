import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Bill from "@/models/Bill";
import mongoose from "mongoose";
import Link from "next/link";
const Bills = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const fetchBill = async (token) => {
      console.log(token);
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allbills`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      let res = await a.json();
      console.log(res.allbills);
      setBills(res.allbills);
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
  // const handleClick = async (item) => {
  //   // const formData = await fetch("");
  //   router.push({
  //     pathname: "/printbill",
  //     query: { formData: JSON.stringify(item) },
  //   });
  // };
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
                        <Link
                          href={{
                            pathname: "/printbill",
                            query: { formData: JSON.stringify(item) },
                          }}
                          key={item.bill_id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
