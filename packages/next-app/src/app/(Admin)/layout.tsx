'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import("@/components/Header/(admin)header"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white min-h-screen">
            <Suspense>
                <Header />
            </Suspense>
            <main>
                {children}
            </main>
        </div>
    )
}
