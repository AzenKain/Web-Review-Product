"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { Slider } from "antd";
import { SearchProductDto } from "@/lib/dtos/product/"
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { UpdateFilter } from '@/app/redux/features/filterSearch';
import slugify from 'slugify'
import { current } from '@reduxjs/toolkit';

type FilterSidebarProps = {
    brand: string[],
    perfumeType: {
        role: string,
        type: string[]
    }[]
}

type filterStorageDto = {
    brand?: string[],
    concentration?: string[],
    sex?: string[],
    size?: string[],
    rangeMoney?: [number, number],
}

export default function FilterSidebar({ brand, perfumeType }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
    const [brandStorage, setBrandStorage] = useState<string[]>([...brand])
    const [filterStorage, setFilterStorage] = useState<filterStorageDto>({})
    const dispatch = useAppDispatch()
    const filters = useAppSelector((state) => state.filterSearch.value);


    const filterBrand = (e: ChangeEvent<HTMLInputElement>) => {
        const target = $(e.currentTarget);
        const value = target.val()?.toLocaleLowerCase();
        setBrandStorage(() => brand.filter(item => item.toLocaleLowerCase().includes(value ? value : "")));
    }

    const changeRangeMoney = (value: number[]) => {
        setFilterStorage((preStorage) => ({
            ...preStorage,
            rangeMoney: [value[0]*1000, value[1]*1000]
        }))
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = $(event.currentTarget)
        const value = target.attr("value")
        const isChecked = target.is(':checked')
        const forFilter = target.attr('custume-for')!

        setFilterStorage((prevStorage: filterStorageDto) => {
            if (isChecked) {
                return {
                    ...prevStorage,
                    [forFilter]: [...(prevStorage[forFilter as keyof typeof prevStorage] || []), value]
                };
            } else {
                return {
                    ...prevStorage,
                    [forFilter]: (prevStorage[forFilter as keyof typeof prevStorage] || []).filter(item => item !== value)
                };
            }
        });
    };

    useEffect(() => {
        const SM: SearchProductDto = {
            ...filters,
            brand: filterStorage.brand?.map(item => ({ type: "brand", value: slugify(item, { lower: true, strict: true }).replace(/-/g, " ") })),
            sex: filterStorage.sex?.map(item => ({ type: "sex", value: slugify(item, { lower: true, strict: true }).replace(/-/g, " ") })),
            concentration: filterStorage.concentration?.map(item => ({ type: "concentration", value: slugify(item, { lower: true, strict: true }).replace(/-/g, " ") })),
            size: filterStorage.size?.map(item => ({ type: "size", value: slugify(item, { lower: true, strict: true }).replace(/-/g, " ") })),
            rangeMoney: filterStorage.rangeMoney,
        }
        console.log(SM)
        dispatch(UpdateFilter({ value: SM }))
    }, [filterStorage])

    return (
        <div className="block w-full">
            <div className="input-search">
                <label className="form-control w-full max-w-xs">
                    <input type="text"
                        onChange={filterBrand}
                        placeholder="Search by brand" className="input input-bordered w-full max-w-xs rounded-none" />
                </label>
                <div className="max-h-72 overflow-y-scroll">
                    <div className="form-control brand-search">
                        {brandStorage ? brandStorage.map((item, index) => (
                            <label className="label cursor-pointer justify-start" key={index}>
                                <input type="checkbox" value={item} custume-for="brand" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h4>SEX</h4>
                    <div className="form-control flex-wrap flex flex-row">
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" value="nam" custume-for="sex" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Male</span>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" value="nữ" custume-for="sex" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Female</span>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" value="unisex" custume-for="sex" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Unisex</span>
                        </label>
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h4>Concentration</h4>
                    <div className="form-control">
                        {perfumeType ? perfumeType.find(perfume => perfume.role === "Concentration")?.type.map((item, index) => (
                            <label className="label cursor-pointer justify-start" key={index}>
                                <input type="checkbox" value={item} custume-for="concentration" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h4>Capacity</h4>
                    <div className="form-control flex-wrap flex flex-row">
                        {perfumeType ? perfumeType.find(perfume => perfume.role === "CAPACITY")?.type.map((item, index) => (
                            <label className="label cursor-pointer justify-start w-1/2" key={index}>
                                <input type="checkbox" value={item} custume-for="size" onChange={handleCheckboxChange} className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h4>Price</h4>
                    <div className="flex flex-row justify-between">
                        <h6>{(priceRange[0] * 1000).toLocaleString('vi-VN')}</h6>
                        <h6>{(priceRange[1] * 1000).toLocaleString('vi-VN')} VND</h6>
                    </div>
                    <Slider range={true} defaultValue={[0, 50000]} min={0} max={50000}
                        tooltip={{ open: false }}
                        className="flex-1"
                        onChange={(e) => setPriceRange([e[0], e[1]])}
                        onChangeComplete={changeRangeMoney}

                    />
                </div>
            </div>
            <style jsx>{`
                h4{
                    text-transform: uppercase;
                    font-weight: 700;
                }
            `}</style>
        </div>
    )
}