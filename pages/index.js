import Image from "next/image";
import { Inter } from "next/font/google";

import Head from "next/head";
import Link from "next/link";
import Login from "./login";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Packers</title>
        <meta name="description" content="Shop Smart. Shop Next" />
      </Head>
      <Login />

    </>
  );
}
