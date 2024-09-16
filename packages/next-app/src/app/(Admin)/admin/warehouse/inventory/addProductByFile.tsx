"use client"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { FileUpload } from '@/components/Input'
import EditableTable from '@/components/Table/editableTable'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export default function AddByFile() {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                className="box-border w-full"
                name="basic"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="m-8">
                    <Form.Item wrapperCol={{
                        offset: 8, span: 16, style: { textAlign: 'right' }
                    }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <FileUpload />
                    <EditableTable />
                </div>
            </Form>
        </>
    )
}