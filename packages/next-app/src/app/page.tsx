"use client"
import { FC } from 'react';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import MainCard from "../components/Card/MainCard";
import TopPerfumeCarousel from "../components/Carousel/TopPerfumeCarousel"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Perfume {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

interface PageProps {
    topUnisexPerfume: Perfume[],
    topManPerfume: Perfume[],
    topWomanPerfume: Perfume[]
}

const Page: FC<PageProps> = ({
    topUnisexPerfume,
    topManPerfume,
    topWomanPerfume
}) => {
    return (
        <main id="main-content" className="min-h-[190vh] bg-base-100 z-1 relative">
            <div className="divider-page h-[200px] w-full text-3xl text-center flex justify-center flex-col"><a>UNISEX PERFUME</a></div>
            <div className="box-border p-[1%]">
                <TopPerfumeCarousel Perfume={topUnisexPerfume} />
            </div>
            <div className="divider-page h-[200px] w-full text-3xl text-center flex justify-center flex-col"><a>MAN PERFUME</a></div>
            <div className="box-border p-[1%]">
                <TopPerfumeCarousel Perfume={topManPerfume} reverse={true} />
            </div>
                <div className="divider-page h-[200px] w-full text-3xl text-center flex justify-center flex-col"><a>WOMAN PERFUME</a></div>
            <div className="box-border p-[1%]">
                <TopPerfumeCarousel Perfume={topWomanPerfume} />
            </div>
            <div className="add-contact h-64 flex justify-center flex-col">
                <form className="flex flex-row justify-between mx-[10%]">
                    <div className="contact-info max-w-[50%]">
                        <h6 className="footer-title">ConTact DunKain Perfume</h6>
                        <p>Thank you for your interest in DunKain Perfume, where passion and the art of fragrance come together to create unique experiences. We’re always here to listen and assist you. Whether you’re seeking advice on the perfect scent, want to learn more about our products, or have any other inquiries, don’t hesitate to reach out to us. Your satisfaction is our top priority at DunKain Perfume.</p>
                    </div>
                    <fieldset className="form-control w-80">
                        <div>
                            <FacebookIcon /><a href="https://www.facebook.com/profile.php?id=100055831407283">See our FB page</a>
                        </div>
                        <div>
                            <TwitterIcon /><a href="https://www.facebook.com/profile.php?id=100055831407283">See our TW page</a>
                        </div>
                        <div>
                            <GitHubIcon /><a href="https://www.facebook.com/profile.php?id=100055831407283">See our GIT page</a>
                        </div>
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="ggMap w-full flex flex-row justify-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5888048598886!2d105.78863241166319!3d20.96902198058479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad45949d675b%3A0x6068a93ab6b49f71!2zQ1QxIENodW5nIGPGsCBWaeG7h24gMTAz!5e0!3m2!1svi!2s!4v1724575227462!5m2!1svi!2s"
                    width="90%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div>
                <div className="collapse">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">Click me to show/hide content</div>
                    <div className="collapse-content">
                        <p>hello</p>
                    </div>
                </div>
            </div>
            <div className="end h-10 bg-neutral w-full"></div>
        </main>
    );
}

export default Page;
