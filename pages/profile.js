import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });

  const [key, setKey] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Myemail = localStorage.getItem("email");
    console.log(Myemail);
    if (token) {
      setUser({ value: token, email: Myemail });
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

  return (
    <>
      <Navbar user={user} logout={logout} key={key} />
      <form id="myForm" className="max-w-lg mx-auto p-6">
        profile
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border"
            type="text"
            id="email"
            value={user.email}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-1 font-semibold"
            htmlFor="consignor_address"
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
      </form>
    </>
  );
};

export default Profile;
