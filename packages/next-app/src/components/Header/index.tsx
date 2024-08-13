import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useCallback, useEffect, useRef, useState } from 'react';
export default function Header() {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const detailsRef = useRef<HTMLLIElement>(null);
    const ulRef = useRef<HTMLUListElement>(null); 

    const [brandName, setBrandName] = useState<string[]>([])
    const [topBrandName, setTopBrandName] = useState<string[]>([])

    const openNavbarOption = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const targetElement: HTMLElement = e.currentTarget
        targetElement.hasAttribute('open') ? targetElement.removeAttribute('open') : targetElement.setAttribute('open', '')
    }, [])

    const openNavbarOptionLg = useCallback(() => {
        if (detailsRef.current) {
            detailsRef.current.setAttribute('open', '');
        }
        if (ulRef.current) {
            ulRef.current.style.display = 'flex';
        }
    }, []);

    const closeNavbarOptionLg = useCallback(() => {
        if (detailsRef.current && ulRef.current) {
            detailsRef.current.removeAttribute('open');
            ulRef.current.style.display = 'none';
        }
    }, []);

    const handleSummaryClick = (event: Event) => {
        if ((event.target as HTMLElement).tagName !== 'A') {
            event.preventDefault();
        }
    }

    useEffect(() => {
        const summaries = document.querySelectorAll('.header-option summary');
        summaries.forEach((summary) => {
            summary.addEventListener('click', handleSummaryClick);
        });
        return () => {
            summaries.forEach((summary) => {
                summary.removeEventListener('click', handleSummaryClick);
            });
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setBrandName(["Afnan",
                "Al Haramain",
                "Alaia",
                "Alexandria Fragrances",
                "Amouage",
                "Argos Fragrances",
                "Armaf",
                "Astrophil Stella",
                "Atelier Cologne",
                "ATELIER MATERI",
                "Attar Collection",
                "Azzaro",
                "BDK Parfums",
                "BORNTOSTANDOUT",
                "Burberry",
                "Butterfly Thai Perfume",
                "Bvlgari",
                "Byredo",
                "Calvin Klein",
                "Carner Barcelona",
                "Carolina Herrera",
                "Chabaud",
                "Chanel",
                "Chasing Scents",
                "Chlóe",
                "Christian Louboutin",
                "City Rhythm",
                "Clive Christian",
                "Creed",
                "Dame Perfumery",
                "Dior",
                "Diptyque",
                "Dolce & Gabbana",
                "Dsquared2",
                "Elie Saab",
                "Elizabeth Arden",
                "Escentric Molecules",
                "Etat Libre d'Orange",
                "Ex Nihilo",
                "Franck Boclet",
                "Frederic Malle",
                "Giardini Di Toscana",
                "Giorgio Armani",
                "Gritti",
                "Gucci",
                "Guerlain",
                "Hermes",
                "Imaginary Authors",
                "Initio Parfums Prives",
                "Jean Paul Gaultier",
                "Jimmy Choo",
                "Jo Malone",
                "Juliette Has A Gun",
                "Jusbox Perfumes",
                "Kilian",
                "L'Orchestre",
                "Lalique",
                "Lanvin",
                "Le Galion",
                "Le Labo",
                "Liquides Imaginaires",
                "Loewe",
                "Louis Vuitton",
                "Mad et Len",
                "Maison Francis Kurkdjian",
                "Maison Margiela",
                "Maison Matine",
                "Maison Violet",
                "Mancera",
                "Manos Gerakinis",
                "Marc Jacobs",
                "Marc-Antoine Barrois",
                "Marie Jeanne",
                "Matiere Premiere",
                "MCM",
                "Memo Paris",
                "Meo Fusciuni",
                "Missoni",
                "MITH Bangkok",
                "Montale",
                "Montblanc",
                "Moschino",
                "Narciso Rodriguez",
                "Nasomatto",
                "Nautica",
                "Nishane",
                "Once Perfume",
                "Orto Parisi",
                "Paco Rabanne",
                "Parfums de Marly",
                "Parfums MDCI",
                "Penhaligon's",
                "Prada",
                "Ralph Lauren",
                "Rasasi",
                "Roja Parfums",
                "Salvatore Ferragamo",
                "Serge Lutens",
                "Strangers Parfumerie",
                "The Merchant of Venice",
                "Thierry Mugler",
                "Tom Ford",
                "Trussardi",
                "Valentino",
                "Van Cleef & Arpels",
                "Versace",
                "Victoria's Secret",
                "Viktor & Rolf",
                "Xerjoff",
                "Yves Saint Laurent"])
            setTopBrandName([
                "Thierry Mugler",
                "Tom Ford",
                "Trussardi",
                "Valentino",
                "Van Cleef & Arpels"
            ])
        }, 2000)
    })


    return (
        <div className="top-0 left-0 absolute z-50 flex w-full flex-col">
            <header className="navbar bg-base-100 border-b h-14 px-60" style={{
                minHeight: '0px'
            }}>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="product-search">
                    <label className="input input-bordered flex items-center gap-2 h-10">
                        <input type="text" className="grow" placeholder="What do you need?" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">8 Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <header className="navbar bg-base-100 flex h-10 border-b px-60 header-option relative" style={{
                minHeight: '0px'
            }}>
                <ul className="menu menu-horizontal px-1 navbar-option w-full justify-around">
                    <li><a>Home</a></li>
                    <li><a>About ĐunKain</a></li>
                    <li className="pesudo-class" style={{ position: "static" }}
                        ref={detailsRef}
                        onMouseOver={openNavbarOptionLg}
                        onMouseOut={closeNavbarOptionLg}
                    >
                        <details>
                            <summary><a href="/done">Trademark</a></summary>
                        </details>
                        <ul
                            ref={ulRef}
                            onMouseOver={openNavbarOptionLg}
                            onMouseOut={closeNavbarOptionLg}
                            className="menu xl:menu-horizontal bg-base-200 scrollbar"
                            style={{
                                display: 'none',
                                position: "absolute",
                                top: "50px",
                                left: 0,
                                maxWidth: "70vw",
                                maxHeight: "70vh",
                                marginLeft: "15vw",
                                marginRight: "15vw",
                                flexDirection: "row",
                                boxSizing: "border-box",
                                overflowY: "scroll",
                                animationName: "popup-ani",
                                animationDuration: "1s",
                            }}>
                            <div className="w-1/3">
                                <h2 className="uppercase text-lg" style={{
                                    marginInlineStart: "1rem",
                                    paddingInlineStart: "0.5rem"
                                }}>Best selling brand</h2>
                                <ul className="steps steps-vertical">
                                    {topBrandName.map((brand, index) => (
                                        <li key={index} className="step uppercase"><a>{brand}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-2/3">
                                <h2 className="uppercase text-center text-lg mb-5" style={{
                                    marginInlineStart: "1rem",
                                    paddingInlineStart: "0.5rem"
                                }}>Perfume brand</h2>
                                <div className="flex flex-wrap justify-center">
                                    <button className="btn btn-square btn-outline m-px h-8 min-h-0 w-20 mr-6">All</button>
                                    {alphabet.map((letter) => (
                                        <button key={letter} className="btn btn-square btn-outline m-px w-8 h-8 min-h-0">
                                            {letter}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <ul className="brand-item flex flex-row flex-wrap">
                                        {brandName.map((brand, index) => (
                                            <li key={index} className="w-1/3 uppercase mt-1"><a>{brand}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ul>
                    </li>
                    <li>
                        <details onMouseOver={openNavbarOption} onMouseOut={openNavbarOption}>
                            <summary>Perfume</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details onMouseOver={openNavbarOption} onMouseOut={openNavbarOption}>
                            <summary>News</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Contact</a></li>
                </ul>
            </header>
            <style jsx>{`
                .navbar-option li a:hover,
                .navbar-option li summary:hover {
                    background-color: transparent;
                    color: #E7E7E7
                }
                .header-option .menu :where(li ul)::before {
                    width: 0px
                }

                .navbar-option .pesudo-class::after {
                    content: '';
                    display: none;
                    position: absolute;
                    bottom: -15px;
                    left: 0;
                    width: 70%;
                    margin-left: 15%;
                    margin-right: 15%;
                    height: 30px;
                }
                .navbar-option li[open] summary::after{
                    transform: rotate(225deg);
                    margin-top: 0;
                }
                .navbar-option .pesudo-class:hover::after {
                    display: block;
                }
                .navbar-option>li {
                    font-weight: bold;
                }
                @keyframes popup-ani {
                  from {
                      opacity: 0;
                  }
                  to {
                      opacity: 1;
                  }
                }
            `}</style>
        </div>
    )
}