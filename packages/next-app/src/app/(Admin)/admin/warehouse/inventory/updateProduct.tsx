"use client";
import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { InputAdd, Editor, UploadImage } from "@/components/Input";

type FieldType = {
    id: string;
    name: string;
    displayCost: string;
    originCost?: string;
    brand?: string;
    longevity?: string;
    concentration?: string;
    fragranceNotes?: string;
    sex?: string;
    sillage?: string;
    size?: string[];
    description?: string;
    tutorial?: string;
    url?: string;
    link?: string[];
};

type updateProductprops = {
    updateKey?: number,
    changeTab?: (a : string) => void
}

const App: React.FC<updateProductprops> = ({updateKey, changeTab}) => {
    const onFinish = (values: FieldType) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            className="m-8 box-border"
            name="updateProduct"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="flex w-full flex-row">
                <div className="w-[60%] mr-[5%]">
                    <Form.Item<FieldType>
                        label="id"
                        name="id"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="name"
                        name="name"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="originCost"
                        name="originCost"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="displayCost"
                        name="displayCost"
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="brand"
                        name="brand"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="brand" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="longevity"
                        name="longevity"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="longevity" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="concentration"
                        name="concentration"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="concentration" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="fragranceNotes"
                        name="fragranceNotes"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="fragranceNotes" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="sex"
                        name="sex"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="sex" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="sillage"
                        name="sillage"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="sillage" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="size"
                        name="size"
                        rules={[{ required: true, message: "Must fill" }]}
                    >
                        <InputAdd typeTag="size" multi={true} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item<FieldType>
                        label="description"
                        name="description"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Editor typeTag="description" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="tutorial"
                        name="tutorial"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Editor typeTag="tutorial" />
                    </Form.Item>
                    <div className="flex flex row">
                        <Form.Item<FieldType>
                            label="thubnail"
                            name="url"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <UploadImage typeTag="url" maxImage={1} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="image"
                            name="link"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <UploadImage typeTag="link" />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: "12px" }}> Submit </Button>
                <Button htmlType="reset">reset</Button>
            </Form.Item>
        </Form>
    );
};

export default App;
