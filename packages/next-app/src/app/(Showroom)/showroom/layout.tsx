import React from 'react'
import FilterSidebar from '@/components/Fillter/sidebar'
import FilterNavbar from '@/components/Fillter/navbar'
import { GetTagsProduct } from '@/lib/api'
import Pagination from '@/components/Footer/Pagination'

type typePerfumeType = {
    role: string,
    type: string[]
}

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const { brand, perfumeType } = await getBrandData();
    return (
        <>
            <div className="p-2 z-[10] bg-base-100 flex flex-row">
                <div className="p-4" style={{
                    flex: '0 0 350px'
                }}>
                    <FilterSidebar brand={brand as string[]} perfumeType={perfumeType as typePerfumeType[]} />
                </div>
                <div className="flex-1 p-4">
                    <FilterNavbar />
                    <div className="relative">
                        {children}
                        <div className="w-full flex justify-center">
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-10 bg-neutral w-full glass"></div>
        </>
    );
}

async function getBrandData() {

    const brand = (await GetTagsProduct("brand")).map(item => item.value).sort()
    const perfumeType = [
        {
            role: "FRAGRANCE GROUP",
            type: (await GetTagsProduct("fragranceNotes")).map(item => item.value).sort()
        },
        {
            role: "CONCENTRATION",
            type: (await GetTagsProduct("concentration")).map(item => item.value).sort()
        },
        {
            role: "CAPACITY",
            type: (await GetTagsProduct("size")).map(item => item.value).sort()
        }
    ];

    return { brand, perfumeType };
}