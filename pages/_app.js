import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  // const [user, setUser] = useState({ value: null });
  // const [key, setKey] = useState(0);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   setUser({ value: token });
    //   setKey(Math.random());
    // }
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
  }, [router.query]);
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser({ value: null });
  //   setKey(Math.random());
  // };
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <Navbar user={user} logout={logout} key={key} /> */}
      <Component {...pageProps} />
    </>
  );
}
