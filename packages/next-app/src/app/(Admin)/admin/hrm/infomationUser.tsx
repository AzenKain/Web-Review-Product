import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { Select } from 'antd';
import { getAllUserName, getUserById } from '@/lib/api'
import { useSession } from "next-auth/react";


const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'UserName',
        children: 'Zhou Maomao',
    },
    {
        key: '2',
        label: 'Telephone',
        children: '1810000000',
    },
    {
        key: '3',
        label: 'Live',
        children: 'Hangzhou, Zhejiang',
    },
    {
        key: '4',
        label: 'Address',
        span: 2,
        children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
    {
        key: '5',
        label: 'Remark',
        children: 'empty',
    },
];

const App: React.FC = () => {
    const { data: session } = useSession();
    const [userSearch, setUserSearch] = useState<{ id: string, name: string }[]>([])
    const [items, setItems] = useState<DescriptionsProps['items']>([])

    const fetchData = async () => {
        try {
            const users: { username: string, secretKey: string }[] = await getAllUserName(session?.access_token);
            return users;
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const fetchUser = async (id: string) => {
        if (session?.access_token) {
            try {
                const user = await getUserById(id, session?.access_token);
                return user;
            } catch (error) {
                console.error('Error fetching user by ID: ', error);
            }
        }
    }

    useEffect(() => {
        if (session) {
            fetchData()
                .then(data => {
                    console.log(data)
                    setUserSearch(data?.map(e => ({ id: e.secretKey, name: e.username })) || [])
                })
        }
    }, [session]);


    const onChange = (value: string, option: any) => {
        fetchUser(option.key as string)
            .then(data => {
                console.log(data)
                setItems([
                    {
                        key: '1',
                        label: 'UserName',
                        children: data?.username || "no infomation",
                    },
                    {
                        key: '2',
                        label: 'Telephone',
                        children: data?.details?.phoneNumber || "no infomation",
                    },
                    {
                        key: '3',
                        label: 'Gender',
                        children: data?.detail?.gender || "no infomation",
                    },
                    {
                        key: '4',
                        label: 'Created_at',
                        span: 2,
                        children: data?.created_at || "no infomation",
                    },
                    {
                        key: '7',
                        label: 'Birthday',
                        children: data?.detail?.birthday || "no infomation",
                    },
                    {
                        key: '5',
                        label: 'Address',
                        span: 2,
                        children: data?.details?.address || "no infomation",
                    },
                    {
                        key: '6',
                        label: 'Role',
                        children: data?.detail?.role || "no infomation",
                    },
                    {
                        key: '8',
                        label: 'FirstName',
                        children: data?.detail?.firstName || "no infomation",
                    },
                    {
                        key: '9',
                        label: 'LastName',
                        children: data?.detail?.lastName || "no infomation",
                    },
                ])
            })
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return (
        <div className="m-8">
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={userSearch.map(e => ({
                    value: e.name,
                    lable: e.id,
                    key: e.id,
                }))}
            />
            <Descriptions title="User Info" layout="vertical" items={items} className="my-8" />
        </div>
    )
}
export default App;