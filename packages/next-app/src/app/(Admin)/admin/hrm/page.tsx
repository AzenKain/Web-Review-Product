"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('antd').then(mod => mod.Tabs), { ssr: false });
const AddUser = dynamic(() => import('./addUser'), { ssr: false });
const InfomationUser = dynamic(() => import('./infomationUser'), { ssr: false });

export default function Page() {
    const items = [
        {
            key: '1',
            label: 'Thêm người dùng',
            children: <AddUser />,
        },
        {
            key: '2',
            label: 'Thông tin người dùng',
            children: <InfomationUser />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} tabPosition="left" className="min-h-screen" />
    );
}
