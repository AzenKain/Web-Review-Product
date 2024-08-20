"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import MainCard from "../components/Card/MainCard";

interface Perfume {
    img?: string;
    name: string;
    description: string;
    tags: string[];
    href?: string;
    cost: string;
}

export default function Home() {
    const [unisexPerfume, setUnisexPerfume] = useState<Perfume[] | null>(null)

    useEffect(() => {
        setTimeout(() => {
            setUnisexPerfume(
                [
                    {
                        "img": "/images/atelier.png",
                        "name": "ATELIER MATERI",
                        "description": "Atelier Materi Santal Blond EDP",
                        "tags": ["EDP", "Santal Blond", "Atelier Materi"],
                        "cost": "6,500,000 VND"
                    },
                    {
                        "img": "/images/clive.png",
                        "name": "CLIVE CHRISTIAN",
                        "description": "Clive Christian E Cashmere Musk",
                        "tags": ["EDP", "Cashmere Musk", "Clive Christian"],
                        "cost": "12,200,000 VND"
                    },
                    {
                        "img": "/images/borntostandout.png",
                        "name": "BORNTOSTANDOUT",
                        "description": "BTSO Dirty Rice EDP",
                        "tags": ["EDP", "Dirty Rice", "BornToStandOut"],
                        "cost": "5,330,000 VND"
                    },
                    {
                        "img": "/images/gritti.png",
                        "name": "GRITTI",
                        "description": "Neroli Extreme Gritti",
                        "tags": ["EDP", "Neroli Extreme", "Gritti"],
                        "cost": "5,500,000 VND"
                    },
                    {
                        "img": "/images/fusciuni.png",
                        "name": "FUSCIUNI CAT",
                        "description": "Fusciuni Little Song",
                        "tags": ["EDP", "Little Song", "Fusciuni"],
                        "cost": "6,900,000 VND"
                    }
                ])
        }, 3000)
    }, [])

    return (
        <main id="main-content" className="min-h-[190vh] bg-base-100 z-1 relative">
            <div className="divider-page h-[200px] w-full text-3xl text-center flex justify-center flex-col"><a>UNISEX PERFUME</a></div>
            <div className="box-border p-[1%]">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    loop={true}
                    slidesPerView={4}
                    speed={1000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    allowTouchMove={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,                   
                            spaceBetween: 20,

                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {unisexPerfume ? unisexPerfume.map((perfume, index) => (
                        <SwiperSlide key={index}>
                            <MainCard item={perfume} />
                        </SwiperSlide>
                    )) : null}
                </Swiper>

            </div>
        </main>
    );
}
