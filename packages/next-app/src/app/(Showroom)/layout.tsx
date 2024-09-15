'use client'
import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { GetTagsProduct } from '@/lib/api'
import { perfumeType } from '@/types'

// Dynamic import for components that need to be client-side only
const Footer = dynamic(() => import('@/components/Footer/index'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const FilterSidebar = dynamic(() => import('@/components/Fillter/sidebar'), { ssr: false });
const FilterNavbar = dynamic(() => import('@/components/Fillter/navbar'), { ssr: false });
const Pagination = dynamic(() => import('@/components/Footer/Pagination'), { ssr: false });

type typePerfumeType = {
    role: string,
    type: string[]
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const [brandName, setBrandName] = useState<string[]>([]);
    const [topBrandName] = useState<string[]>(["Thierry Mugler", "Tom Ford", "Trussardi", "Valentino", "Van Cleef & Arpels"]);
    const [perfumeType, setPerfumeType] = useState<perfumeType[]>([]);

    const adjustCarouselHeight = () => {
        const header = document.getElementById('header');
        const body = document.getElementById('main-content');
        if (header && body) {
            const headerHeight = header.offsetHeight;
            body.style.marginTop = `${headerHeight}px`;
        }
    };

    useEffect(() => {
        async function fetchData() {
            const { brand, perfumeType } = await getBrandData();
            setBrandName(brand as string[]);
            setPerfumeType(perfumeType as perfumeType[]);
        }
        fetchData();
        
        window.addEventListener('resize', adjustCarouselHeight);
        return () => { window.removeEventListener('resize', adjustCarouselHeight); };
    }, []);

    return (
        <div className="relative">
            <Suspense>
                <Header brandName={brandName} topBrandName={topBrandName} perfumeType={perfumeType} />
                <main onLoad={adjustCarouselHeight} id="main-content" style={{ position: "relative", zIndex: 10, marginBottom: "95vh" }}>
                    <div className="p-2 z-[10] bg-base-100 flex flex-row">
                        <div className="p-4" style={{ flex: '0 0 350px' }}>
                            <FilterSidebar brand={brandName} perfumeType={perfumeType as typePerfumeType[]} />
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
                </main>
                <Footer />
            </Suspense>
        </div>
    );
}

async function getBrandData() {
    const brand = (await GetTagsProduct("brand")).map(item => item.value).sort();
    const perfumeType = [
        {
            role: "Pefume",
            type: (await GetTagsProduct("sex")).map(item => item.value).sort()
        },
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
