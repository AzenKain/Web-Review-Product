import React, { useState, useRef, useEffect } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Space, Table, Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { getAllProduct, deleteProductById } from '@/lib/api'
import { ProductData } from '@/lib/dtos/product'
type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
    id?: string;
    key?: string;
    name?: string;
    buyCount?: number;
    created_at?: string;
    updated_at?: string;
    displayCost?: number;
    originCost?: string;
    stockQuantity?: number;
    brand?: string;
    concentration?: string;
    fragranceNotes?: string;
    longevity?: string;
    sex?: string;
    sillage?: string;
    size?: string;
}

type DataIndex = keyof DataType;

type searchProductprops = {
    setUpdateKey: (a : number) => void,
    changeTab: (a: string) => void
}

const App: React.FC<searchProductprops> = ({ setUpdateKey, changeTab }) => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState<DataType[]>([])
    const searchInput = useRef<InputRef>(null);

    const fetchData = async () => {
        const { data } = await getAllProduct()
        return data
    }

    useEffect(() => {
        const fetchAndSetData = async () => {
            const products = await fetchData();
            console.log(products)

            setData(products.map((e: ProductData) => ({
                id: e.id,
                key: e.id,
                name: e.name,
                buyCount: e.buyCount,
                created_at: e.created_at,
                updated_at: e.updated_at,
                displayCost: e.displayCost,
                originCost: e.originCost?.toString(),
                stockQuantity: e.stockQuantity,
                brand: e.details?.brand?.value,
                concentration: e.details?.concentration?.value,
                fragranceNotes: e.details?.fragranceNotes?.value,
                longevity: e.details?.longevity?.value,
                sex: e.details?.sex?.value,
                sillage: e.details?.sillage?.value,
                size: e.details?.size?.map(s => s?.value).filter(Boolean).join(', '),
            })));
        };

        fetchAndSetData();
    }, []);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const deleteCell = (cell: DataType) => {
        setData(e => e.filter(i => i != cell))
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]!
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            width: 50,
            fixed: true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name?.includes(value as string)!,
            sorter: (a, b) => a.name?.length! - b.name?.length!,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Buy Count',
            dataIndex: 'buyCount',
            width: 100,
            key: 'buyCount',
            sorter: (a, b) => a.buyCount! - b.buyCount!,
            sortOrder: sortedInfo.columnKey === 'buyCount' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            width: 150,
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime(),
            sortOrder: sortedInfo.columnKey === 'created_at' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Updated At',
            width: 150,
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: (a, b) => new Date(a.updated_at!).getTime() - new Date(b.updated_at!).getTime(),
            sortOrder: sortedInfo.columnKey === 'updated_at' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Display Cost',
            width: 100,
            dataIndex: 'displayCost',
            key: 'displayCost',
            sorter: (a, b) => a.displayCost! - b.displayCost!,
            sortOrder: sortedInfo.columnKey === 'displayCost' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Origin Cost',
            width: 100,
            dataIndex: 'originCost',
            key: 'originCost',
            sorter: (a, b) => parseFloat(a.originCost!) - parseFloat(b.originCost!),
            sortOrder: sortedInfo.columnKey === 'originCost' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Stock Quantity',
            width: 100,
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            sorter: (a, b) => a.stockQuantity! - b.stockQuantity!,
            sortOrder: sortedInfo.columnKey === 'stockQuantity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Brand',
            width: 200,
            dataIndex: 'brand',
            key: 'brand',
            filters: Array.from(new Set(data.map(item => item.brand)
                .filter(Boolean))).map(brand => ({
                    text: brand!,
                    value: brand!
                })),
            filteredValue: filteredInfo.brand || null,
            onFilter: (value, record) => record.brand?.includes(value as string)!,
            ellipsis: true,
        },
        {
            title: 'Concentration',
            width: 150,
            dataIndex: 'concentration',
            key: 'concentration',
            filters: Array.from(new Set(data.map(item => item.concentration)
                .filter(Boolean))).map(concentration => ({
                    text: concentration!,
                    value: concentration!
                })),
            sortOrder: sortedInfo.columnKey === 'concentration' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Fragrance Notes',
            width: 200,
            dataIndex: 'fragranceNotes',
            filters: Array.from(new Set(data.map(item => item.fragranceNotes)
                .filter(Boolean))).map(fragranceNotes => ({
                    text: fragranceNotes!,
                    value: fragranceNotes!
                })),
            key: 'fragranceNotes',
            ellipsis: true,
        },
        {
            title: 'Longevity',
            width: 150,
            dataIndex: 'longevity',
            key: 'longevity',
            filters: Array.from(new Set(data.map(item => item.longevity)
                .filter(Boolean))).map(longevity => ({
                    text: longevity!,
                    value: longevity!
                })),
            sortOrder: sortedInfo.columnKey === 'longevity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Sex',
            width: 100,
            dataIndex: 'sex',
            key: 'sex',
            filters: Array.from(new Set(data.map(item => item.sex)
                .filter(Boolean))).map(sex => ({
                    text: sex!,
                    value: sex!
                })),
            filteredValue: filteredInfo.sex || null,
            onFilter: (value, record) => record.sex?.includes(value as string)!,
            ellipsis: true,
        },
        {
            title: 'Sillage',
            dataIndex: 'sillage',
            width: 150,
            key: 'sillage',
            filters: Array.from(new Set(data.map(item => item.sillage)
                .filter(Boolean))).map(sillage => ({
                    text: sillage!,
                    value: sillage!
                })),
            sortOrder: sortedInfo.columnKey === 'sillage' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            width: 150,
            key: 'size',
            sorter: (a, b) => parseFloat(a.size!) - parseFloat(b.size!),
            sortOrder: sortedInfo.columnKey === 'size' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '',
            width: 50,
            dataIndex: 'update',
            key: 'update',
            fixed: 'right' as 'right',
            render: (_, record) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setUpdateKey(Number(record.id));
                        changeTab('4')
                    }}
                />
            ),
        },
        {
            title: '',
            width: 50,
            dataIndex: 'delete',
            key: 'delete',
            fixed: 'right' as 'right',
            render: (_, record) => (
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        deleteCell(record)
                        deleteProductById(Number(record.id))
                    }}
                />
            ),
        },
    ];

    return (
        <div className="w-full">
            <Table columns={columns} className="m-8" dataSource={data} onChange={handleChange} scroll={{ x: 1300 }} />
        </div>
    );
};

export default App;
