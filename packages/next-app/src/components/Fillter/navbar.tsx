"use client"
import { useState, useEffect, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { UpdateFilter } from '@/app/redux/features/filterSearch';
import { SearchProductDto } from '@/lib/dtos/product'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import $ from 'jquery'
import { Divider } from 'antd';

export default function FilterNavbar() {
    const dispatch = useAppDispatch()
    const filters = useAppSelector((state) => state.filterSearch.value)
    const maxProduct = useAppSelector((state) => state.filterSearch.maxValue) || 1
    const [maxPage, setMaxPage] = useState<number>(1)

    useEffect(() => {
        setMaxPage(Math.ceil((filters.index && filters.count) ? (maxProduct / filters.count) : 1))
    }, [filters.index, maxProduct])

    const handleClick = (page: number) => {
        const SM: SearchProductDto = {
            ...filters,
            index: page
        }
        dispatch(UpdateFilter({ value: SM }))
    };

    const handleSelect = (type: string, value: string) => {
        const SM: SearchProductDto = {
            ...filters,
            [type]: value,
            index: 1
        }
        dispatch(UpdateFilter({ value: SM }))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = $(e.currentTarget).val();
        console.log(newValue)
        if (!isNaN(Number(newValue))) {
            const SM: SearchProductDto = {
                ...filters,
                index: Number(e.target.value)
            }
            dispatch(UpdateFilter({ value: SM }))
            e.target.value = '';
        }
        else { e.target.value = '' }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") { e.currentTarget.blur() } }

    const openFilter = () => {
        $("#filter-toggle").trigger('click');
    }

    return (
        <div className="flex flex-row flex-wrap justify-between">
            <button className="join-item btn block xl:hidden" onClick={() => { openFilter() }}><FilterAltIcon fontSize="large" /></button>
            <select onChange={(e) => {
                handleSelect("count", e.target.value)
            }}
                className="select select-bordered rounded-none w-24" value={filters.count}>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="96">96</option>
            </select>
            <select onChange={(e) => {
                handleSelect("sort", e.target.value)
            }}
                className="select select-bordered max-w-xs rounded-none" value={filters.sort}>
                <option value="created_at_asc">Cũ nhất</option>
                <option value="created_at_desc">Mới nhất</option>
                <option value="price_desc">Giá cao - thấp</option>
                <option value="price_asc">Giá thấp - cao</option>
            </select>
            <select onChange={(e) => {
                handleSelect("hotSales", e.target.value)
            }}
                className="select select-bordered max-w-xs rounded-none" value="">
                <option value="">Bán chạy</option>
                <option value="week">Bán chạy trong tuần</option>
                <option value="month">Bán chạy trong tháng</option>
                <option value="year">Bán chạy trong năm</option>
            </select>
            <div className="flex-1"></div>
            <div className="join rounded-none">
                <button className="join-item btn btn-outline" disabled={filters.index == 1} onClick={() => { handleClick(1) }}>&lt;&lt;</button>
                <button className="join-item btn btn-outline" disabled={filters.index == 1} onClick={() => { handleClick(Number(filters.index) - 1) }}>&lt;</button>
                <input type="text" placeholder={String(filters.index)} onKeyDown={handleKeyDown} onBlur={handleChange} className="input w-20 btn-outline rounded-none text-center" />
                <button className="join-item btn btn-outline" disabled={maxPage == filters.index} onClick={() => { handleClick(Number(filters.index) + 1) }}>&gt;</button>
                <button className="join-item btn btn-outline" disabled={maxPage == filters.index} onClick={() => { handleClick(maxPage) }}>&gt;&gt;</button>
            </div>
        </div>
    )
}