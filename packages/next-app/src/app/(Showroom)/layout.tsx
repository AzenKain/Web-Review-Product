import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer/index";
import Header from "@/components/Header";


export default async function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {

    const { brandName, topBrandName, perfumeType } = await getBrandData()

    return (
        <div className="relative">
            <Header brandName={brandName} topBrandName={topBrandName} perfumeType={perfumeType} /> {/*z-index: 50*/}
            <main id="main-content" style={{ position: "relative", zIndex: 10, marginBottom: "95vh" }}>
                {children}
            </main>
            <Footer /> {/*z-index: 0*/}
            <script
                id="margin-header"
                dangerouslySetInnerHTML={{
                    __html: `
                              $(document).ready(function() {
                                function adjustCarouselHeight() {
                                  const header = $('#header');
                                  const body = $('#main-content');
                                  if (header.length && body.length) {
                                    const headerHeight = header.outerHeight();
                                    body.css({
                                      'margin-top': headerHeight + 'px',
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

function getBrandData() {

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
