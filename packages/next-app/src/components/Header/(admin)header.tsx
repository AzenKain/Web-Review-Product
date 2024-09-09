import React, { useState } from 'react';
import { HomeOutlined, MailOutlined, SettingOutlined, ShopOutlined, BarChartOutlined, FileDoneOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';0.
import Link from 'next/link'
import Avatar from '@/components/Avatar'


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link href="/admin">Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link href="/admin/sales">Sales</Link>,
        key: 'sales',
        icon: <FileDoneOutlined />,
    },
    {
        label: 'Warehouse',
        key: 'warehouse',
        icon: <ShopOutlined />,
        children: [
            {
                type: 'group',
                children: [
                    { label: <Link href="/admin/warehouse/inventory">Inventory</Link>, key: 'inventory' },
                    { label: <Link href="/admin/warehouse/manage-storage">Manage Storage</Link>, key: 'manage-storage' },
                ],
            },
        ],
    },
    {
        label: 'Marketing',
        key: 'marketing',
        icon: <MailOutlined />,
        children: [
            {
                type: 'group',
                children: [
                    { label: <Link href="/admin/marketing/product">Product</Link>, key: 'marketing-product' },
                    { label: <Link href="/admin/marketing/news">News</Link>, key: 'marketing-news' },
                ],
            },
        ],
    },
    {
        label: <Link href="/admin/hrm">HRM</Link>,
        key: 'hrm',
        icon: <TeamOutlined />,
    },
    {
        label: <Link href="/admin/analytics">Analytics</Link>,
        key: 'analytics',
        icon: <BarChartOutlined />,
    },
];

const App: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        < Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
    )
};

export default App;