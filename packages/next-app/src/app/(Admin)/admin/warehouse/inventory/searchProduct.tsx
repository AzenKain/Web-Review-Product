import React, { useState, useRef, useEffect } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Space, Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
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

const data: DataType[] = [
    {
        id: '1',
        key: '1',
        name: 'John Brown',
        buyCount: 32,
        created_at: '2023-01-01',
        updated_at: '2023-02-01',
        displayCost: 100,
        originCost: '90',
        stockQuantity: 20,
        brand: 'Brand A',
        concentration: 'Medium',
        fragranceNotes: 'Floral',
        longevity: 'Long',
        sex: 'Male',
        sillage: 'Strong',
        size: '100ml',
    },
    {
        id: '2',
        key: '2',
        name: 'Jane Doe',
        buyCount: 45,
        created_at: '2023-03-10',
        updated_at: '2023-04-15',
        displayCost: 120,
        originCost: '110',
        stockQuantity: 35,
        brand: 'Brand B',
        concentration: 'High',
        fragranceNotes: 'Citrus',
        longevity: 'Moderate',
        sex: 'Female',
        sillage: 'Mild',
        size: '50ml',
    },
    {
        id: '3',
        key: '3',
        name: 'Mike Smith',
        buyCount: 27,
        created_at: '2023-05-01',
        updated_at: '2023-06-01',
        displayCost: 80,
        originCost: '70',
        stockQuantity: 15,
        brand: 'Brand C',
        concentration: 'Light',
        fragranceNotes: 'Woody',
        longevity: 'Short',
        sex: 'Male',
        sillage: 'Weak',
        size: '75ml',
    },
    {
        id: '4',
        key: '4',
        name: 'Alice Johnson',
        buyCount: 60,
        created_at: '2023-02-14',
        updated_at: '2023-03-01',
        displayCost: 150,
        originCost: '140',
        stockQuantity: 50,
        brand: 'Brand D',
        concentration: 'Very High',
        fragranceNotes: 'Fruity',
        longevity: 'Very Long',
        sex: 'Female',
        sillage: 'Strong',
        size: '150ml',
    },
    {
        id: '5',
        key: '5',
        name: 'Robert Green',
        buyCount: 18,
        created_at: '2023-07-20',
        updated_at: '2023-08-10',
        displayCost: 95,
        originCost: '85',
        stockQuantity: 10,
        brand: 'Brand E',
        concentration: 'Medium',
        fragranceNotes: 'Spicy',
        longevity: 'Moderate',
        sex: 'Male',
        sillage: 'Mild',
        size: '100ml',
    },
    {
        id: '6',
        key: '6',
        name: 'Emily White',
        buyCount: 52,
        created_at: '2023-09-01',
        updated_at: '2023-09-20',
        displayCost: 110,
        originCost: '100',
        stockQuantity: 40,
        brand: 'Brand F',
        concentration: 'Low',
        fragranceNotes: 'Vanilla',
        longevity: 'Long',
        sex: 'Female',
        sillage: 'Strong',
        size: '125ml',
    },
    {
        id: '7',
        key: '7',
        name: 'David Lee',
        buyCount: 38,
        created_at: '2023-10-05',
        updated_at: '2023-11-01',
        displayCost: 140,
        originCost: '130',
        stockQuantity: 30,
        brand: 'Brand G',
        concentration: 'Medium',
        fragranceNotes: 'Floral',
        longevity: 'Short',
        sex: 'Male',
        sillage: 'Mild',
        size: '50ml',
    },
    {
        id: '8',
        key: '8',
        name: 'Sophia Black',
        buyCount: 22,
        created_at: '2023-12-12',
        updated_at: '2024-01-01',
        displayCost: 85,
        originCost: '75',
        stockQuantity: 25,
        brand: 'Brand H',
        concentration: 'Light',
        fragranceNotes: 'Woody',
        longevity: 'Moderate',
        sex: 'Female',
        sillage: 'Weak',
        size: '100ml',
    },
    {
        id: '9',
        key: '9',
        name: 'Henry Brown',
        buyCount: 29,
        created_at: '2023-11-11',
        updated_at: '2023-12-01',
        displayCost: 130,
        originCost: '120',
        stockQuantity: 28,
        brand: 'Brand I',
        concentration: 'High',
        fragranceNotes: 'Citrus',
        longevity: 'Very Long',
        sex: 'Male',
        sillage: 'Strong',
        size: '75ml',
    },
    {
        id: '10',
        key: '10',
        name: 'Olivia Davis',
        buyCount: 33,
        created_at: '2024-01-02',
        updated_at: '2024-02-01',
        displayCost: 105,
        originCost: '95',
        stockQuantity: 12,
        brand: 'Brand J',
        concentration: 'Very High',
        fragranceNotes: 'Spicy',
        longevity: 'Very Long',
        sex: 'Female',
        sillage: 'Very Strong',
        size: '150ml',
    },
];


const App: React.FC = () => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

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
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            filters: [
                { text: 'John Brown', value: 'John Brown' },
            ],
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
            width: 50,
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
            filters: [
                { text: 'Brand A', value: 'Brand A' },
                { text: 'Brand B', value: 'Brand B' },
            ],
            filteredValue: filteredInfo.brand || null,
            onFilter: (value, record) => record.brand?.includes(value as string)!,
            ellipsis: true,
        },
        {
            title: 'Concentration',
            width: 150,
            dataIndex: 'concentration',
            key: 'concentration',
            sorter: (a, b) => a.concentration?.length! - b.concentration?.length!,
            sortOrder: sortedInfo.columnKey === 'concentration' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Fragrance Notes',
            width: 200,
            dataIndex: 'fragranceNotes',
            key: 'fragranceNotes',
            ellipsis: true,
        },
        {
            title: 'Longevity',
            width: 150,
            dataIndex: 'longevity',
            key: 'longevity',
            sorter: (a, b) => a.longevity?.length! - b.longevity?.length!,
            sortOrder: sortedInfo.columnKey === 'longevity' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Sex',
            width: 100,
            dataIndex: 'sex',
            key: 'sex',
            filters: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
            ],
            filteredValue: filteredInfo.sex || null,
            onFilter: (value, record) => record.sex?.includes(value as string)!,
            ellipsis: true,
        },
        {
            title: 'Sillage',
            dataIndex: 'sillage',
            width: 150,
            key: 'sillage',
            sorter: (a, b) => a.sillage?.length! - b.sillage?.length!,
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
    ];

    return (
        <div className="w-full">
            <Space style={{ marginBottom: 16, textAlign: "right", width: "100%" }} className="m-8">
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} className="m-8" dataSource={data} onChange={handleChange} scroll={{ x: 1300 }} />
        </div>
    );
};

export default App;
