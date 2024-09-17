import React from 'react';
import { Button, Form, Input, Select, Space, InputNumber } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

type FieldType = {
    email?: string,
    birthday?: string,
    address?: string,
    firstName?: string,
    gender?: string,
    lastName?: string,
    password?: string,
    phoneNumber?: string,
    role?: string,
    username?: string,
}

const App: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => { console.log(values); };

    const onReset = () => { form.resetFields(); };

    return (
        <Form
            {...layout}
            className="box-border w-full"
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className="m-8">
                <Form.Item wrapperCol={{ offset: 8, span: 16, style: { textAlign: "right" }}}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item<FieldType>
                    name="firstName"
                    label="firstName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="lastName"
                    label="lastName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="address"
                    label="address"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="email"
                    label="email"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="role"
                    label="role"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="username"
                    label="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="phoneNumber"
                    label="phoneNumber"
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="gender"
                    label="gender"
                    rules={[{ required: true }]}
                >
                    <Select
                        options={[
                            { value: 'nam', label: 'nam' },
                            { value: 'nữ', label: 'nữ' },
                        ]}
                    />
                </Form.Item>
            </div>
        </Form>
    );
};

export default App;