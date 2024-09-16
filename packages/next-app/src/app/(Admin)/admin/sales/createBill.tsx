"use client";
import React from "react";
import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { InputAdd, Editor, UploadImage } from "@/components/Input";
const { TextArea } = Input;

type FieldType = {
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: number,
    notes?: string,
    isPaid?: boolean,
    productId?: string,
    quantity?: number,
};

const App: React.FC = () => {
    const onFinish = (values: FieldType) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            className="mt-8 box-border w-full"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="m-8">
                <Form.Item wrapperCol={{ offset: 8, span: 16, style: { textAlign: 'right' } }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: "12px" }}> Submit </Button>
                    <Button htmlType="reset">reset</Button>
                </Form.Item>
                <div className="flex flex-row ">
                    <div className="w-[40%] mr-[5%]">
                    <Form.Item<FieldType>
                        label="firstName"
                        name="firstName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="lastName"
                        name="lastName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="phoneNumber"
                        name="phoneNumber"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="isPaid"
                        name="isPaid"
                    >
                        <Radio.Group>
                            <Radio value="true">true</Radio>
                            <Radio value="false">false</Radio>
                        </Radio.Group>
                    </Form.Item>
                    </div>
                    <div className="w-[55%]">
                        <div className="flex flex-row">
                            <div className="flex-1">
                                <Form.Item<FieldType>
                                    label="productId"
                                    name="productId"
                                    rules={[{ required: true, message: "Must fill" }]}
                                >
                                    <Select
                                        
                                    >
                                        <Select.Option>awd</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="quantity"
                                    name="quantity"
                                    rules={[{ required: true, message: "Must fill" }]}
                                >
                                    <InputNumber style={{width: "100%"}} />
                                </Form.Item>
                            </div>
                            <Button className="w-8 ml-4 h-[88px]">+</Button>
                        </div>

                        <Form.Item<FieldType>
                            label="notes"
                            name="notes"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <TextArea
                                showCount
                                maxLength={300}
                                placeholder="..."
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default App;
