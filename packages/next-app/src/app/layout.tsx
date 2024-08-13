"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer/index";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html data-theme="luxury" lang="en">
      <head>
        <title>ĐunKain Perfume</title>
        <meta name='description' content='Description' />
        <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={`${inter.className} selection:bg-base-content selection:text-base-100`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <Providers>
          <StoreProvider>
            <Header/>
            {children}
            <ToastContainer />
{/*            <Footer />*/}
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
