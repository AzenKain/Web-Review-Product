'use client'
import React, { useEffect } from 'react'
import ShapeCard from '@/components/Card/ShapeCard'
import Pagination from '@/components/Footer/Pagination'
import { Perfume } from '@/types/Perfume'
import { GetProductForSearch } from "@/lib/api"
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { UpdatePerfume } from '@/app/redux/features/filterSearch';


export default function Page() {
    const filters = useAppSelector((state) => state.filterSearch.value)
    const perfumes = useAppSelector((state) => state.filterSearch.perfumes)
    const dispatch = useAppDispatch()

    const fetchData = async () => {
        const responseData: Perfume[] = await GetProductForSearch(filters);
        dispatch(UpdatePerfume({ value: responseData }))
    };

    useEffect(() => {
        fetchData();
    }, [filters, dispatch])

    return (
        <>
            <div className="flex w-full flex-row flex-wrap justify-between">
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard
                        key={index}
                        id={perfume.id}
                        name={perfume.name}
                        brand={perfume.brand}
                        img={perfume.img}
                        cost={perfume.cost} />
                )) : null}
            </div>
            <div className="flex flex-row justify-center mt-10"><Pagination /></div>
        </>
    )
}