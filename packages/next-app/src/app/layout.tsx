import { Dancing_Script, Inter, Luxurious_Roman, Nanum_Gothic } from "next/font/google";
import React from 'react'
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

import Script from 'next/script'
export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html data-theme="luxury" lang="en">
            <head>
                <title>DunKain Perfume</title>
                <meta name='description' content='Description' />
                <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="x-icon" sizes="16x16" href="/favicon.ico" />
                <link rel="manifest" href="/site.webmanifest"></link>
                <script src="/js/jquery-3.7.1.min.js"></script>
                {/* <Script strategy="beforeInteractive" src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></Script> */}
            </head>
            <body className={`${inter.className} selection:bg-base-content selection:text-base-100`}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <Providers>
                    <StoreProvider>
                        {children}
                        <ToastContainer />
                    </StoreProvider>
                </Providers>
            </body>
        </html>
    );
}