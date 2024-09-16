"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('antd').then(mod => mod.Tabs), { ssr: false });
const AddNewProduct = dynamic(() => import('./addNewProduct'), { ssr: false });
const AddProductByFile = dynamic(() => import('./addProductByFile'), { ssr: false });

export default function Page() {
    const items = [
        {
            key: '1',
            label: 'Thêm sản phẩm',
            children: <AddNewProduct />,
        },
        /*        {
                    key: '2',
                    label: 'Thêm file sản phẩm mới',
                    children: <AddNewProductByFile />,
                },*/
        {
            key: '3',
            label: 'Nhập hàng',
            children: <AddProductByFile />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} tabPosition="left" className="min-h-screen" />
    );
}
