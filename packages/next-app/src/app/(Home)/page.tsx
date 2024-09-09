﻿"use client"
import { FC, useState } from 'react';
import React from 'react'
import 'swiper/css';
import 'swiper/css/autoplay';
import TopPerfumeCarousel from "@/components/Carousel/TopPerfumeCarousel"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Introduce from './introduce'

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
    const [isOpenIntroduce, setIsOpenIntroduce] = useState<boolean>(false)

    return (
        <main id="main-content" className="bg-base-100 z-1 relative m-auto min-h-[190vh] xl:container">
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
            <div id="main-introduce" className={`xl:container my-16 pt-8 border-t border-neutral ${isOpenIntroduce ? "" : "h-96 overflow-hidden"} relative`}>
                <div style={{
                    height: "100%",
                    padding: "20px 20px",
                    position: "relative",
                    filter: isOpenIntroduce ? "" : "blur(1px)",
                    maskImage: isOpenIntroduce ? "" : "linear-gradient(to bottom, white, transparent)"
                }}><Introduce /></div>
                <a href="/#main-introduce"><button className="btn glass absolute rounded-none" style={{
                    bottom: 0,
                    left: "50%",
                    transform: `translate(-50%, ${isOpenIntroduce ? "40px" : "-20px"})`
                }} onClick={() => {
                    setIsOpenIntroduce((isOpenIntroduce => !isOpenIntroduce))
                }}>{isOpenIntroduce ? "Thu gọn" : "Đọc thêm"}</button></a>
            </div>
            <div className="add-contact h-64 flex justify-center flex-col py-16" id="contact">
                <form className="flex flex-row justify-between mx-8">
                    <div className="contact-info flex-1 mr-12">
                        <h2 className="footer-title font-bold text-2xl">ConTact DunKain Perfume</h2>
                        <p>Thank you for your interest in DunKain Perfume, where passion and the art of fragrance come together to create unique experiences. We’re always here to listen and assist you. Whether you’re seeking advice on the perfect scent, want to learn more about our products, or have any other inquiries, don’t hesitate to reach out to us. Your satisfaction is our top priority at DunKain Perfume.</p>
                    </div>
                    <fieldset className="form-control w-80 flex gap-1 contact-icon">
                        <div className="flex flex-row">
                            <FacebookIcon /><div className="flex-1"></div><a href="https://www.facebook.com/profile.php?id=100055831407283">See our Facebook page</a>
                        </div>
                        <div className="flex flex-row">
                            <TwitterIcon /><div className="flex-1"></div><a href="https://www.facebook.com/profile.php?id=100055831407283">See our Twister page</a>
                        </div>
                        <div className="flex flex-row">
                            <GitHubIcon /><div className="flex-1"></div><a href="https://www.facebook.com/profile.php?id=100055831407283">See our GITHUB page</a>
                        </div>
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item w-full" />
                            <button className="btn btn-neutral join-item btn-outline">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="ggMap w-full flex flex-row justify-center my-8">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5888048598886!2d105.78863241166319!3d20.96902198058479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad45949d675b%3A0x6068a93ab6b49f71!2zQ1QxIENodW5nIGPGsCBWaeG7h24gMTAz!5e0!3m2!1svi!2s!4v1724575227462!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </main>
    );
}

export default Page;
