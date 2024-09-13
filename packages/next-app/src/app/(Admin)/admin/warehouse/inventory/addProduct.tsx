"use client"
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { InputAdd, Editor } from '@/components/Input'

type FieldType = {
    name?: string;
    displayCost?: string;
    originCost?: string;
    brand?: string;
};

const App: React.FC = () => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => { console.log('Success:', values); };
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => { console.log('Failed:', errorInfo); };

    return (
        <Form
            className="mt-8 w-4/5"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="name"
                name="name"
                rules={[{ required: true, message: 'Must fill' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="originCost"
                name="originCost"
                rules={[{ required: true, message: 'Must fill' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="displayCost"
                name="displayCost"
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="brand"
                name="brand"
            >
                <InputAdd typeTag="brand"/>
            </Form.Item>

            <Form.Item
                label="longevity"
                name="longevity"
            >
                <InputAdd typeTag="longevity" />
            </Form.Item>

            <Form.Item
                label="concentration"
                name="concentration"
            >
                <InputAdd typeTag="concentration" />
            </Form.Item>

            <Form.Item
                label="fragranceNotes"
                name="fragranceNotes"
            >
                <InputAdd typeTag="fragranceNotes" />
            </Form.Item>

            <Form.Item
                label="sex"
                name="sex"
            >
                <InputAdd typeTag="sex" />
            </Form.Item>

            <Form.Item
                label="sillage"
                name="sillage"
            >
                <InputAdd typeTag="sillage" />
            </Form.Item>

            <Form.Item
                label="size"
                name="size"
            >
                <InputAdd typeTag="size" multi={true} />
            </Form.Item>

            <Form.Item
                label="description"
                name="description"
            >
                <Editor />
            </Form.Item>

            <Form.Item
                label="tutorial"
                name="tutorial"
            >
                <Editor />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}




export default App;