import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import User from "@/models/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });

  const [key, setKey] = useState(0);
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setphone] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Myemail = localStorage.getItem("email");
    setEmail(Myemail);
    if (token) {
      setUser({ value: token, email: Myemail });
      fetchuser(token);
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

  const handleChange = (e) => {
    if (e.target.name == "name") setName(e.target.value);
    else if (e.target.name == "address") setAddress(e.target.value);
    else if (e.target.name == "phone") setphone(e.target.value);
    else if (e.target.name == "pan") setPan(e.target.value);
    else if (e.target.name == "gstin") setGstin(e.target.value);
    else if (e.target.name == "password") setPassword(e.target.value);
    else if (e.target.name == "newpassword") setnewPassword(e.target.value);
    else if (e.target.name == "confirmpassword") {
      SetconfirmPassword(e.target.value);
    }
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log(responce);
    setName(responce.name);
    setAddress(responce.address);
    setGstin(responce.gstin);
    setPan(responce.pan);
    setphone(responce.phone);
  };

  const handleUserSubmit = async (e) => {
    let data = { token: user.value, address, name, phone, gstin, pan, image };
    console.log(data);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let responce = await res.json();
    console.log(responce);
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
  const handlePasswordSubmit = async (e) => {
    let responce;
    if (newpassword === confirmPassword) {
      let data = { token: user.value, password, newpassword, confirmPassword };
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      responce = await res.json();
    } else {
      responce = { success: false };
    }
    if (responce.success) {
      toast.success("Your Password Updated !", {
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
      toast.error("Something going wrong!", {
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
    setPassword("");
    setnewPassword("");
    SetconfirmPassword("");
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">1. Profile-change</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                readOnly
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                id="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded-md"
                id="address"
                rows="4"
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="pan">
                PAN No.
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                id="pan"
                value={pan}
                placeholder="Enter your PAN number"
                name="pan"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="gstin">
                GSTIN No.
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="text"
                value={gstin}
                id="gstin"
                placeholder="Enter your GSTIN number"
                name="gstin"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="tel"
                value={phone}
                id="phone"
                placeholder="Enter your phone number"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                className="w-full border border-gray-300 p-2 rounded-md"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {image && (
                <div>
                  <img
                    src={image}
                    alt="Selected"
                    className="mt-4 rounded-md h-32 w-32"
                  />
                </div>
              )}
            </div>
            <button
              className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleUserSubmit}
            >
              Submit
            </button>
            <h1 className="text-2xl font-bold mb-4">2. Password Change</h1>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium dark:text-green-500 text-black"
              >
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="newpassword"
                className="block mb-2 text-sm font-medium dark:text-green-500 text-black"
              >
                New Password
              </label>
              <input
                onChange={handleChange}
                type="newpassword"
                name="newpassword"
                id="newpassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium dark:text-green-500 text-black"
              >
                Confirm New Password
              </label>
              <input
                type="confirmpassword"
                name="confirmpassword"
                onChange={handleChange}
                id="confirmpassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              onClick={handlePasswordSubmit}
              className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
