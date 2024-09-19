"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('antd').then(mod => mod.Tabs), { ssr: false });
const CreateBill = dynamic(() => import('./createBill'), { ssr: false });
const TraceabilityBill = dynamic(() => import('./traceabilityBill'), { ssr: false });

export default function Page() {
    const items = [
        {
            key: '1',
            label: 'Thêm hóa đơn',
            children: <CreateBill />,
        },
        {
            key: '2',
            label: 'truy xuất hóa đơn',
            children: <TraceabilityBill />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} tabPosition="left" className="min-h-screen" />
    );
}
