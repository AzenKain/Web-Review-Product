"use client"
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';
import { GetTagsProduct } from '@/lib/api'

type createTypeDto = {
    type: string,
    value?: string 
}

export const InputAdd: React.FC<{ typeTag: string, multi?: boolean | undefined }> = ({ typeTag, multi }) => {
    const [items, setItems] = useState<createTypeDto[]>([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value); };
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        name && setItems([...items, { type: typeTag, value: name }]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    useEffect(() => {
        GetTagsProduct(typeTag)
            .then(data => {
                setItems(data.map((val) => ({ type: typeTag, value: val.value })))
            })
            .catch(() => console.log("error"))
    }, [])

    return (
        <Select
            className="w-full"
            placeholder={`select ${typeTag}`}
            mode={multi ? "multiple" : undefined}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Add
                        </Button>
                    </Space>
                </>
            )}
            options={items.map((item) => ({ label: item.value, value: item.value }))}
        />
    );
};
