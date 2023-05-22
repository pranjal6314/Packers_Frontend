import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Footer />
    </>
  );
}
