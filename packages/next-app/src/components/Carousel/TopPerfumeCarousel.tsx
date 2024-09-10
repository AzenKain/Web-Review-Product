"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import MainCard from "../Card/MainCard";
import { Perfume } from '@/types/Perfume';


export default function TopPerfumeCarousel({ Perfume, reverse }: { Perfume: Perfume[], reverse?: boolean }) {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            loop={true}
            slidesPerView={4}
            speed={1000}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                reverseDirection: reverse
            }}
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
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                }
            }}
        >
            {Perfume ? Perfume.map((perfume, index) => (
                <SwiperSlide key={index}>
                    <MainCard item={perfume} />
                </SwiperSlide>
            )) : null}
        </Swiper>
    )
}