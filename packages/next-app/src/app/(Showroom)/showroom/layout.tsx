import React from 'react'
import FilterSidebar from '@/components/FillterSidebar'

export default async function HomeLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        type: string,
        value: string,
        id: string
    };
}) {
    const { brand, perfumeType } = await getBrandData();

    return (
        <>
            <div className="p-2 z-[10] bg-base-100 flex flex-row">
                <div className="p-4" style={{
                    flex: '0 0 350px'
                }}>
                    <FilterSidebar brand={brand} perfumeType={perfumeType} />
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
            <div className="h-10 bg-neutral w-full glass"></div>
        </>

    );
}

function getBrandData() {

    const brand = ["Afnan", "Al Haramain", "Alaia", "Alexandria Fragrances", "Amouage", "Argos Fragrances", "Armaf", "Astrophil Stella", "Atelier Cologne", "ATELIER MATERI", "Attar Collection", "Azzaro", "BDK Parfums", "BORNTOSTANDOUT", "Burberry", "Butterfly Thai Perfume", "Bvlgari", "Byredo", "Calvin Klein", "Carner Barcelona", "Carolina Herrera", "Chabaud", "Chanel", "Chasing Scents", "Chl\u00F3e", "Christian Louboutin", "City Rhythm", "Clive Christian", "Creed", "Dame Perfumery", "Dior", "Diptyque", "Dolce & Gabbana", "Dsquared2", "Elie Saab", "Elizabeth Arden", "Escentric Molecules", "Etat Libre d'Orange", "Ex Nihilo", "Franck Boclet", "Frederic Malle", "Giardini Di Toscana", "Giorgio Armani", "Gritti", "Gucci", "Guerlain", "Hermes", "Imaginary Authors", "Initio Parfums Prives", "Jean Paul Gaultier", "Jimmy Choo", "Jo Malone", "Juliette Has A Gun", "Jusbox Perfumes", "Kilian", "L'Orchestre", "Lalique", "Lanvin", "Le Galion", "Le Labo", "Liquides Imaginaires", "Loewe", "Louis Vuitton", "Mad et Len", "Maison Francis Kurkdjian", "Maison Margiela", "Maison Matine", "Maison Violet", "Mancera", "Manos Gerakinis", "Marc Jacobs", "Marc-Antoine Barrois", "Marie Jeanne", "Matiere Premiere", "MCM", "Memo Paris", "Meo Fusciuni", "Missoni", "MITH Bangkok", "Montale", "Montblanc", "Moschino", "Narciso Rodriguez", "Nasomatto", "Nautica", "Nishane", "Once Perfume", "Orto Parisi", "Paco Rabanne", "Parfums de Marly", "Parfums MDCI", "Penhaligon's", "Prada", "Ralph Lauren", "Rasasi", "Roja Parfums", "Salvatore Ferragamo", "Serge Lutens", "Strangers Parfumerie", "The Merchant of Venice", "Thierry Mugler", "Tom Ford", "Trussardi", "Valentino", "Van Cleef & Arpels", "Versace", "Victoria's Secret", "Viktor & Rolf", "Xerjoff", "Yves Saint Laurent"]
    const perfumeType = [
        {
            role: "Concentration",
            type: ["Eau de Cologne", "Eau De Parfum", "Toilet Eau", "Fragrant", "Parfum Extract", "Perfume", "Perfume Enfant"]
        },
        {
            role: "CAPACITY",
            type: ["100ml", "10ml", "125 ml", "35ml", "50ml", "5ml", "75ml", "78 ml", "80ml", "90ml"]
        }
    ];

    return { brand, perfumeType };
}