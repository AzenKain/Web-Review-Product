import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Divider } from 'antd';

interface Item {
    id: string;
    key: string;
    name: string;
    count: number;
    summary: number;
    update_at: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        id: `${i}`,
        key: i.toString(),
        name: `Item ${i}`,
        count: i + 10,
        summary: (i + 10) * 100,
        update_at: new Date().toISOString(),
    });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const App: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', count: '', summary: '', ...record });
        setEditingKey(record.key);
    };

    const deleteCell = (cell: Item) => {
        setData(e => e.filter(i => i != cell))
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            fixed: true,
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '50%',
            editable: true,
        },
        {
            title: 'Count',
            dataIndex: 'count',
            width: '15%',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'Summary',
            dataIndex: 'summary',
            width: '15%',
            editable: true,
            inputType: 'number',
        },
        {
            title: 'Updated At',
            dataIndex: 'update_at',
            width: '30%',
            editable: false,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            width: '150px',
            fixed: 'right' as 'right',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
                            Save
                        </Typography.Link>
                        <Typography.Link onClick={cancel} style={{ marginInlineEnd: 8 }}>
                            Cancel
                        </Typography.Link>
                    </span>
                ) : (
                    <div>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Divider type="vertical" />
                        <Typography.Link onClick={() => deleteCell(record)}>
                            Delete
                        </Typography.Link>
                    </div>
                );
            },
        },
    ];

    const mergedColumns: TableProps<Item>['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'count' || col.dataIndex === 'summary' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                scroll={{ x: 1600 }}
            />
        </Form>
    );
};

export default App;
