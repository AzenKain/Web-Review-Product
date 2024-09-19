import React, { useState, useRef, useEffect } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Space, Table, Input } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { getAllProduct, deleteProductById } from '@/lib/api'
import { ProductData } from '@/lib/dtos/product'
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { DeleteProduct, UpdateListProduct, UpdateProductEditId } from '@/app/redux/features/iventoryData';
import { ProductFormType } from '@/types';

type OnChange = NonNullable<TableProps<ProductFormType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;


type DataIndex = keyof ProductFormType;

const App: React.FC = () => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const data = useAppSelector((state) => state.InventoryData.listProduct)
    const dispatch = useAppDispatch()



    useEffect(() => {
        const fetchAndSetData = async () => {
            const products = (await getAllProduct()).data;
            dispatch(UpdateListProduct(products))
        };

        fetchAndSetData();
    }, [dispatch]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const deleteCell = (cell: ProductFormType) => {
        dispatch(DeleteProduct(cell))
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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ProductFormType> => ({
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

    const columns: TableColumnsType<ProductFormType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            width: 50,
            fixed: true
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
            title: 'product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: 300,
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name?.includes(value as string)!,
            sorter: (a, b) => a.name?.length! - b.name?.length!,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Quantity',
            width: 100,
            dataIndex: 'quantity',
            key: 'quantity',
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
            title: 'Discount',
            dataIndex: 'discount',
            width: 150,
            key: 'discount',
            filters: Array.from(new Set(data.map(item => item.sillage)
                .filter(Boolean))).map(sillage => ({
                    text: sillage!,
                    value: sillage!
                })),
            sortOrder: sortedInfo.columnKey === 'sillage' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            width: 100,
            key: 'totalAmount',
            sorter: (a, b) => a.buyCount! - b.buyCount!,
            sortOrder: sortedInfo.columnKey === 'buyCount' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Is paid',
            width: 150,
            dataIndex: 'idPaid',
            key: 'idPaid',
            sorter: (a, b) => new Date(a.updated_at!).getTime() - new Date(b.updated_at!).getTime(),
            sortOrder: sortedInfo.columnKey === 'updated_at' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Status',
            width: 100,
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.displayCost! - b.displayCost!,
            sortOrder: sortedInfo.columnKey === 'displayCost' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'CustomerId',
            width: 100,
            dataIndex: 'CustomerId',
            key: 'CustomerId',
            sorter: (a, b) => parseFloat(a.originCost!) - parseFloat(b.originCost!),
            sortOrder: sortedInfo.columnKey === 'originCost' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Last Name',
            width: 100,
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a, b) => a.stockQuantity! - b.stockQuantity!,
            sortOrder: sortedInfo.columnKey === 'stockQuantity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'First Name',
            width: 200,
            dataIndex: 'firstName',
            key: 'firstName',
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
            title: 'Phone Number',
            width: 150,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            filters: Array.from(new Set(data.map(item => item.concentration)
                .filter(Boolean))).map(concentration => ({
                    text: concentration!,
                    value: concentration!
                })),
            sortOrder: sortedInfo.columnKey === 'concentration' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Email',
            width: 200,
            dataIndex: 'email',
            filters: Array.from(new Set(data.map(item => item.fragranceNotes)
                .filter(Boolean))).map(fragranceNotes => ({
                    text: fragranceNotes!,
                    value: fragranceNotes!
                })),
            key: 'fragranceNotes',
            ellipsis: true,
        },
        {
            title: 'Address',
            width: 150,
            dataIndex: 'address',
            key: 'address',
            filters: Array.from(new Set(data.map(item => item.longevity)
                .filter(Boolean))).map(longevity => ({
                    text: longevity!,
                    value: longevity!
                })),
            sortOrder: sortedInfo.columnKey === 'longevity' ? sortedInfo.order : null,
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
                        dispatch(
                            UpdateProductEditId(Number(record.id))
                        )
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
