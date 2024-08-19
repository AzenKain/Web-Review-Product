"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Dancing_Script, Inter, Luxurious_Roman, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer/index";
import Header from "../components/Header";
import Carousel from '../components/Carousel';

const inter = Inter({ subsets: ["latin"] });
const luxuriousRoman = Luxurious_Roman({ weight: '400',  subsets: ['latin']})
const nanumGothic = Nanum_Gothic({ weight: '400', subsets: ["latin"] })
const dancingScript = Dancing_Script({weight: '700', subsets: ["latin"]})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [screenHeight, setScreenHeight] = useState<number>(0);

    useEffect(() => {
        if (headerRef.current) { setHeaderHeight(headerRef.current.clientHeight); }
        if (typeof window !== 'undefined') {
            setScreenHeight(window.innerHeight);
            const handleResize = () => { setScreenHeight(window.innerHeight); };
            window.addEventListener('resize', handleResize);
            return () => { window.removeEventListener('resize', handleResize); };
        }
        if (headerRef.current) { setHeaderHeight(headerRef.current.clientHeight); }
    }, []);

  return (
      <html data-theme="luxury" lang="en">
      <head>
        <title>ĐunKain Perfume</title>
        <meta name='description' content='Description' />
        <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
          <body className={`${nanumGothic.className} selection:bg-base-content selection:text-base-100`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <Providers>
          <StoreProvider>
                      <Header ref={headerRef} /> {/*z-index: 50*/}
                      <div style={{ marginTop: headerHeight, width: "100%", height: screenHeight - headerHeight }}><Carousel></Carousel></div>
            <main style={{ position: "relative", zIndex: 10, marginBottom: "95vh" }}>
                {children}
            </main>
            <ToastContainer />
            <Footer /> {/*z-index: 0*/}
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
