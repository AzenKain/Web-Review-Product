"use client"
import { useState } from 'react'
import { Slider } from "antd";

type FilterSidebarProps = {
    brand: string[],
    perfumeType: {
        role: string,
        type: string[]
    }[]
}

export default function FilterSidebar({ brand, perfumeType }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])

    return (
        <div className="block w-full">
            <div className="input-search">
                <label className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Search by brand" className="input input-bordered w-full max-w-xs rounded-none" />
                </label>
                <div className="max-h-72 overflow-y-scroll">
                    <div className="form-control">
                        {brand ? brand.map((item, index) => (
                            <label className="label cursor-pointer justify-start" key={index}>
                                <input type="checkbox" className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h2>SEX</h2>
                    <div className="form-control flex-wrap flex flex-row">
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Male</span>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Female</span>
                        </label>
                        <label className="label cursor-pointer justify-start">
                            <input type="checkbox" className="checkbox mx-2 rounded-none" />
                            <span className="label-text">Unisex</span>
                        </label>
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h2>Concentration</h2>
                    <div className="form-control">
                        {perfumeType ? perfumeType.find(perfume => perfume.role === "Concentration")?.type.map((item, index) => (
                            <label className="label cursor-pointer justify-start" key={index}>
                                <input type="checkbox" className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h2>Capacity</h2>
                    <div className="form-control flex-wrap flex flex-row">
                        {perfumeType ? perfumeType.find(perfume => perfume.role === "CAPACITY")?.type.map((item, index) => (
                            <label className="label cursor-pointer justify-start w-1/2" key={index}>
                                <input type="checkbox" className="checkbox mx-2 rounded-none" />
                                <span className="label-text">{item}</span>
                            </label>
                        )) : null}
                    </div>
                </div>
                <div className="divider"></div>
                <div>
                    <h2>Price</h2>
                    <div className="flex flex-row justify-between">
                        <h3>{priceRange[0]} VND</h3>
                        <h3>{priceRange[1]} VND</h3>
                    </div>
                    <Slider range={true} defaultValue={[0, 50000000]} min={0} max={50000000}
                        className="flex-1"
                        onChange={(e) => setPriceRange([e[0], e[1]])}
                    />
                </div>
            </div>
            <style jsx>{`
                h2{
                    text-transform: uppercase;
                    font-weight: 700;
                }
            `}</style>
        </div>
    )
}