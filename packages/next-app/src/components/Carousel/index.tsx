"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import { Autoplay, EffectFade } from 'swiper/modules';

export default function Carousel () {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="top-[20%] h-[70%] absolute z-20 block flex w-full flex-col text-center">
                <h2 className="dancingScript text-8xl">DunKain Perfume</h2>
                <p className="text-3xl inline hidden lg:block expand-background">“DunKain Pefume : For the Modern Gentleman and the Elegant Lady”</p>
                <div className="flex-1"></div>
                <p className="w-full m-auto font-semibold hidden lg:block expand-background" ><span className="w-[80%] m-auto block">Discover the captivating world of DunKain Pèume, where every fragrance is crafted to embody the perfect blend of sophistication and allure. For the distinguished gentleman, our scents evoke timeless elegance, while for the graceful woman, they inspire a touch of luxurious charm. Immerse yourself in a symphony of aromas that redefine the art of perfumery, bringing out the true essence of your individuality. With DunKain Pèume, step into a realm of refined beauty and unforgettable impressions.</span></p>
                <a href="#main-content"><button className="btn glass w-1/5 min-w-[150px] h-[60px] m-auto mt-3">DISCOVER</button></a>
            </div>
            <Swiper
                className="h-full"
                modules={[Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                speed={2000}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                allowTouchMove={true}
            >
                <SwiperSlide>
                    <img src="images/C2.jpg" alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="images/C4.jpg" alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="images/C5.jpg" alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
