"use client"
import React, { useState } from 'react';
import { Tabs } from 'antd';
import AddProduct from "./addProduct"
import { InputAdd } from '@/components/Input'


export default function Page () {
    const onChange = (key: any) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Thêm sản phẩm',
            children: <AddProduct />,
        },
        {
            key: '2',
            label: 'Nhập hàng loạt',
            children: <InputAdd />,
        },
    ];

    return (<Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition="left" className="min-h-screen" />)
}