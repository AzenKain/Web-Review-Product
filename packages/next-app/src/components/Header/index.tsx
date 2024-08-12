import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useCallback } from 'react';
export default function Header() {
    const openNavbarOption = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const targetElement: HTMLElement = e.currentTarget
        targetElement.hasAttribute('open') ? targetElement.removeAttribute('open') : targetElement.setAttribute('open', '')
    }, [])

    return (
        <div className="z-50 absolute top-0 left-0 w-screen flex flex-col">
            <header className="navbar bg-base-100 border-b h-14" style={{
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
            <header className="navbar bg-base-100 flex justify-center h-10 border-b" style={{
                minHeight: '0px'
            }}>
                <ul className="menu menu-horizontal px-1 navbar-option">
                    <li><a>Home</a></li>
                    <li><a>About ĐunKain</a></li>
                    <li>
                        <details onMouseOver={openNavbarOption} onMouseOut={openNavbarOption}>
                            <summary><a href="/done">Trademark</a></summary>
                            <ul>
                                <h2>done?</h2>
                            </ul>
                        </details>
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
                    color: gray
                }
                .navbar-option li summary + ul::after {
                    display: block;
                    position: absolute;
                    width: 100px;
                    height: 100px;
                }
            `}</style>
        </div>
    )
}