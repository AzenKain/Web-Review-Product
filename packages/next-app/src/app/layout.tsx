import { Dancing_Script, Inter, Luxurious_Roman, Nanum_Gothic } from "next/font/google";
import React from 'react'
import "./globals.css";
import $ from 'jquery';
import Providers from "@/components/Providers/Providers";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "./page"
import Footer from "../components/Footer/index";
import Header from "../components/Header";
import Carousel from '../components/Carousel';

const inter = Inter({ subsets: ["latin"] });
const luxuriousRoman = Luxurious_Roman({ weight: '400', subsets: ['latin'] })
const nanumGothic = Nanum_Gothic({ weight: '400', subsets: ["latin"] })
const dancingScript = Dancing_Script({ weight: '700', subsets: ["latin"] })

type Perfume = {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

export default async function RootLayout() {

    const { brandName, topBrandName, perfumeType } = await getBrandData()
    const { topUnisexPerfume, topManPerfume, topWomanPerfume } = await getTopPerfume()

    return (
        <html data-theme="luxury" lang="en">
            <head>
                <title>ĐunKain Perfume</title>
                <meta name='description' content='Description' />
                <link rel="apple-touch-icon.png" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="x-icon" sizes="16x16" href="/favicon.ico" />
                <link rel="manifest" href="/site.webmanifest"></link>
                <script src="/js/jquery-3.7.1.min.js"></script>
            </head>
            <body className={`${nanumGothic.className} selection:bg-base-content selection:text-base-100`}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <Providers>
                    <StoreProvider>
                        <Header brandName={brandName} topBrandName={topBrandName} perfumeType={perfumeType} /> {/*z-index: 50*/}
                        <div id="main-carousel"><Carousel></Carousel></div>
                        <main style={{ position: "relative", zIndex: 10, marginBottom: "95vh" }}>
                            <Page topUnisexPerfume={topUnisexPerfume} topManPerfume={topManPerfume} topWomanPerfume={topWomanPerfume} /> {/*children*/}
                        </main>
                        <ToastContainer />
                        <Footer /> {/*z-index: 0*/}
                    </StoreProvider>
                </Providers>
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
                                            'top': '-' + (st + 3) + 'px'
                                          });
                                        } else {
                                           header.css({
                                            'top': '-' + (headerHideable + 3) + 'px'
                                          });
                                        }
                                      });
                                    }
                                    handleScroll();
                              `,
                    }}
                ></script>
            </body>
        </html>
    );
}

function getBrandData() {
    /*const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });*/
    // Cache response to ensure it's static
    /*const data = await res.json();*/

    const brandName = ["Afnan", "Al Haramain", "Alaia", "Alexandria Fragrances", "Amouage", "Argos Fragrances", "Armaf", "Astrophil Stella", "Atelier Cologne", "ATELIER MATERI", "Attar Collection", "Azzaro", "BDK Parfums", "BORNTOSTANDOUT", "Burberry", "Butterfly Thai Perfume", "Bvlgari", "Byredo", "Calvin Klein", "Carner Barcelona", "Carolina Herrera", "Chabaud", "Chanel", "Chasing Scents", "Chlóe", "Christian Louboutin", "City Rhythm", "Clive Christian", "Creed", "Dame Perfumery", "Dior", "Diptyque", "Dolce & Gabbana", "Dsquared2", "Elie Saab", "Elizabeth Arden", "Escentric Molecules", "Etat Libre d'Orange", "Ex Nihilo", "Franck Boclet", "Frederic Malle", "Giardini Di Toscana", "Giorgio Armani", "Gritti", "Gucci", "Guerlain", "Hermes", "Imaginary Authors", "Initio Parfums Prives", "Jean Paul Gaultier", "Jimmy Choo", "Jo Malone", "Juliette Has A Gun", "Jusbox Perfumes", "Kilian", "L'Orchestre", "Lalique", "Lanvin", "Le Galion", "Le Labo", "Liquides Imaginaires", "Loewe", "Louis Vuitton", "Mad et Len", "Maison Francis Kurkdjian", "Maison Margiela", "Maison Matine", "Maison Violet", "Mancera", "Manos Gerakinis", "Marc Jacobs", "Marc-Antoine Barrois", "Marie Jeanne", "Matiere Premiere", "MCM", "Memo Paris", "Meo Fusciuni", "Missoni", "MITH Bangkok", "Montale", "Montblanc", "Moschino", "Narciso Rodriguez", "Nasomatto", "Nautica", "Nishane", "Once Perfume", "Orto Parisi", "Paco Rabanne", "Parfums de Marly", "Parfums MDCI", "Penhaligon's", "Prada", "Ralph Lauren", "Rasasi", "Roja Parfums", "Salvatore Ferragamo", "Serge Lutens", "Strangers Parfumerie", "The Merchant of Venice", "Thierry Mugler", "Tom Ford", "Trussardi", "Valentino", "Van Cleef & Arpels", "Versace", "Victoria's Secret", "Viktor & Rolf", "Xerjoff", "Yves Saint Laurent"]
    const topBrandName = ["Thierry Mugler", "Tom Ford", "Trussardi", "Valentino", "Van Cleef & Arpels"];
    const perfumeType = [
        {
            role: "Perfume",
            type: ["Unisex Perfume", "Women's Perfume", "Men's Perfume"]
        },
        {
            role: "FRAGRANCE GROUP",
            type: ["Floral", "Floral Fruity", "Woody"]
        },
        {
            role: "Concentration",
            type: ["Eau de Cologne", "Eau De Parfum", "Toilet Eau", "Fragrant", "Parfum Extract", "Perfume", "Perfume Enfant"]
        },
        {
            role: "CAPACITY",
            type: ["100ml", "10ml", "125 ml", "35ml", "50ml", "5ml", "75ml", "78 ml", "80ml", "90ml"]
        }
    ];

    return { brandName, topBrandName, perfumeType };
}

function getTopPerfume() {
    const topUnisexPerfume: Perfume[] = (
        [
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


    const topManPerfume: Perfume[] = [...topUnisexPerfume]
    const topWomanPerfume: Perfume[] = [ ...topUnisexPerfume ]
    return { topUnisexPerfume, topManPerfume, topWomanPerfume }
}