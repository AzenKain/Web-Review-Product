'use client'
import React, { useState, useEffect } from 'react'
import ShapeCard from '@/components/Card/ShapeCard'
import Pagination from '@/components/Footer/Pagination'

type Perfume = {
    img?: string;
    name: string;
    description: string;
    cost: string;
}

export default function Page() {
    const [perfumes, setPerfumes] = useState <Perfume[]>([])

    useEffect(() => {
        setTimeout(() => {
            setPerfumes([
                {
                    "img": "/images/atelier.png",
                    "name": "ATELIER MATERI",
                    "description": "Atelier Materi Santal Blond EDP",
                    "cost": "6,500,000 VND"
                },
                {
                    "img": "/images/clive.png",
                    "name": "CLIVE CHRISTIAN",
                    "description": "Clive Christian E Cashmere Musk",
                    "cost": "12,200,000 VND"
                },
                {
                    "img": "/images/borntostandout.png",
                    "name": "BORNTOSTANDOUT",
                    "description": "BTSO Dirty Rice EDP",
                    "cost": "5,330,000 VND"
                },
                {
                    "img": "/images/gritti.png",
                    "name": "GRITTI",
                    "description": "Neroli Extreme Gritti",
                    "cost": "5,500,000 VND"
                },
                {
                    "img": "/images/fusciuni.png",
                    "name": "FUSCIUNI CAT",
                    "description": "Fusciuni Little Song",
                    "cost": "6,900,000 VND"
                }
            ])
        }, 3000) 
    }, [])

    return (
        <>
            <div className="flex w-full flex-row flex-wrap justify-between">
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost}  />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
            </div>
            <div className="flex flex-row justify-center mt-10"><Pagination /></div>
        </>
    )
}