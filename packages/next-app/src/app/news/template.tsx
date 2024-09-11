import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer/index";
import Header from "@/components/Header";
import { GetTagsProduct } from '@/lib/api'
import { perfumeType } from '@/types'

type Perfume = {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

export default async function HomeTemplate({
    children
}: {
    children: React.ReactNode
}) {

    const { brandName, topBrandName, perfumeType } = await getBrandData()

    return (
        <div className="relative">
            <Header brandName={brandName as string[]} topBrandName={topBrandName} perfumeType={perfumeType as perfumeType[]} /> {/*z-index: 50*/}
            <main id="main-page" style={{ position: "relative", zIndex: 10, marginBottom: "95vh" }}>
                { children }
            </main>
            <Footer /> {/*z-index: 0*/}
            <script
                id="margin-header"
                dangerouslySetInnerHTML={{
                    __html: `
                              $(document).ready(function() {
                                function adjustCarouselHeight() {
                                  const header = $('#header');
                                  const body = $('#main-page');

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
            role: "Perfume",
            type: (await GetTagsProduct("sex")).map(item => item.value).sort()
        },
        {
            role: "FRAGRANCE GROUP",
            type: (await GetTagsProduct("fragranceNotes")).map(item => item.value).sort()
        },
        {
            role: "Concentration",
            type: (await GetTagsProduct("concentration")).map(item => item.value).sort()
        },
        {
            role: "CAPACITY",
            type: (await GetTagsProduct("size")).map(item => item.value).sort()
        }
    ];

    return { brandName, topBrandName, perfumeType };
}
