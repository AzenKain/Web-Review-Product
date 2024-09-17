﻿import React from 'react'
import Footer from "@/components/Footer/index";
import Header from "@/components/Header";
import Carousel from '@/components/Carousel';
import { GetTagsProduct } from '@/lib/api'
import { perfumeType } from '@/types'

export default async function HomeTemplate({
    children
}: {
    children: React.ReactNode
}) {

    const { brandName, topBrandName, perfumeType } = await getBrandData()

    return (
        <div className="relative">
            <Header brandName={brandName as string[]} topBrandName={topBrandName} perfumeType={perfumeType as perfumeType[]} /> {/*z-index: 50*/}
            <div id="main-carousel" className="overflow-hidden"><Carousel></Carousel></div>
            <main className="bg-base-100" style={{ position: "relative", zIndex: 10, marginBottom: "95vh", width: "100%" }}>
                {children}
                <div className="end h-10 bg-neutral w-full glass"></div>
            </main>
            <Footer /> {/*z-index: 0*/}
            <script
                id="margin-header"
                dangerouslySetInnerHTML={{
                    __html: `
                              $(document).ready(function() {
                                function adjustCarouselHeight() {
                                  const header = $('#header');
                                  const body = $('#main-carousel');

                                  if (header.length && body.length) {
                                    const headerHeight = header.outerHeight();
                                    const viewportHeight = $(window).height();
                                    const carouselHeight = viewportHeight - headerHeight;

                                    body.css({
                                      'margin-top': headerHeight + 'px',
                                      'height': carouselHeight + 'px'
                                    });
                                  }
                                }

                                // Set initial height and margin
                                adjustCarouselHeight();

                                // Adjust on window resize
                                $(window).resize(adjustCarouselHeight);
                              });
                              `,
                }}
            ></script>
            <script
                id="hide-header"
                dangerouslySetInnerHTML={{
                    __html: `
                                  function handleScroll() {
                                      const header = $('#header');
                                      const headerHideable = $('#header>.hideable').outerHeight();
                                      $(window).on('scroll', function() {
                                        const st = $(this).scrollTop();
                                        if (st < headerHideable) {
                                          header.css({
                                            'top': '-' + st + 'px'
                                          });
                                        } else {
                                           header.css({
                                            'top': '-' + headerHideable + 'px'
                                          });
                                        }
                                      });
                                    }
                                    handleScroll();
                              `,
                }}
            ></script>
        </div>
    );
}

async function getBrandData() {

    const brandName = (await GetTagsProduct("brand")).map(item => item.value).sort()
    const topBrandName = ["Thierry Mugler", "Tom Ford", "Trussardi", "Valentino", "Van Cleef & Arpels"];
    const perfumeType = [
        {
            role: "sex",
            type: (await GetTagsProduct("sex")).map(item => item.value).sort()
        },
        {
            role: "fragranceNotes",
            type: (await GetTagsProduct("fragranceNotes")).map(item => item.value).sort()
        },
        {
            role: "concentration",
            type: (await GetTagsProduct("concentration")).map(item => item.value).sort()
        },
        {
            role: "size",
            type: (await GetTagsProduct("size")).map(item => item.value).sort()
        }
    ];

    return { brandName, topBrandName, perfumeType };
}

