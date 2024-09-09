'use client'
import React from 'react'
import Header from "@/components/Header/(admin)header"
import Trigger from "@/components/Trigger"

export default function layout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className="bg-white min-h-screen">
            <Header />
            <div className="flex flex-row">
                <Trigger />
                <main className="mt-8 m-auto xl:container">
                    { children }
                </main>
            </div>
        </div>
    )
}