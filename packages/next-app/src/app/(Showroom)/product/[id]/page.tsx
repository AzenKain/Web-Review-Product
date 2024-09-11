import ImageGallery from '@/components/Gallery'
import TabContent from '@/components/Tab'
import TopPerfumeCarousel from '@/components/Carousel/TopPerfumeCarousel'
import { Perfume } from '@/types';
import { GetProductForSearch } from '@/lib/api';

export default async function Page() {
    const imageUrls = [
        '/images/C2.jpg',
        '/images/C4.jpg',
        '/images/C5.jpg',
    ];

    const linkedPerfume = await getLinkedPerfume()

    return (
        <div className="bg-base-100">
            <div className="pt-8 m-auto flex flex-row xl:container">
                <div className="w-[300px]">
                    <ImageGallery images={imageUrls} />
                </div>
                <div className="sumary-product flex-1 p-6">
                    <div className="flex flex-row">
                        <h1 className="text-3xl font-bold">Name</h1>
                        <div className="badge badge-secondary ml-2 self-center">male</div>
                        <div className="flex-1"></div>
                        <input type="checkbox" className="self-center checkbox checkbox-error mask mask-heart bg-red-400" />
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Cost:</h3>
                        <h3 className="text-red-500 font-bold text-[18px] mb-[4px]">1000000VND</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Inventory quantity:</h3>
                        <h3 className="text-[18px] mb-[4px]">5436</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Purchased:</h3>
                        <h3 className="text-[18px] mb-[4px]">12321</h3>
                    </div>
                    <div className="divider"></div>
                    <h3 className="text-[18px] mb-[4px]">Capacity: </h3>
                    <div>
                        <button className="btn btn-outline btn-sm">100ML</button>
                        <button className="btn btn-outline btn-sm">10ML</button>
                    </div>
                    <h4 className="text-red-500 float-right text-xs"> HOTLINE 0985564645</h4>
                </div>
                <div className="p-4 w-[400px] border-4 rounded-lg border-neutral">
                    <h1 className="font-bold">PRODUCT INFOMATION</h1>
                    <div className="product-property flex flex-col">
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-1.svg)',
                                    WebkitMask: 'url(/icons/ic-info-1.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Brand: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-2.svg)',
                                    WebkitMask: 'url(/icons/ic-info-2.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Concentration: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-3.svg)',
                                    WebkitMask: 'url(/icons/ic-info-3.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Fragrance retention: </h3>
                            <a href="" className="h-5 self-center">something link</a>
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-4.svg)',
                                    WebkitMask: 'url(/icons/ic-info-4.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Fragrance: </h3>
                            <a href="" className="h-5 self-center">something link</a>
                        </div>
                        <div className="h-16 flex flex-row">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-5.svg)',
                                    WebkitMask: 'url(/icons/ic-info-5.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Gender: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:container m-auto mt-24 flex flex-row">
                <div className="flex-1 mr-6"><TabContent /></div>
                <div className="p-4 w-[400px] border-4 rounded-lg border-neutral">
                    <h1 className="font-bold">PRODUCT INFOMATION</h1>
                    <div className="product-property flex flex-col">
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-1.svg)',
                                    WebkitMask: 'url(/icons/ic-info-1.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Brand: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-2.svg)',
                                    WebkitMask: 'url(/icons/ic-info-2.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Concentration: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-3.svg)',
                                    WebkitMask: 'url(/icons/ic-info-3.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Fragrance retention: </h3>
                            <a href="" className="h-5 self-center">something link</a>
                        </div>
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-4.svg)',
                                    WebkitMask: 'url(/icons/ic-info-4.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Fragrance: </h3>
                            <a href="" className="h-5 self-center">something link</a>
                        </div>
                        <div className="h-16 flex">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    mask: 'url(/icons/ic-info-5.svg)',
                                    WebkitMask: 'url(/icons/ic-info-5.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Gender: </h3>
                            <a href="" className="h-5 self-center underline">something link</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:container m-auto mt-20 mb-10">
                <h1 className="text-3xl font-bold mb-5">RELATED PRODUCTS</h1>
                <TopPerfumeCarousel Perfume={linkedPerfume} reverse={true} />
            </div>
            <div className="h-10 bg-neutral w-full glass"></div>
        </div>
    )
}

async function getLinkedPerfume() {
    return await GetProductForSearch({index: 1, count: 12})
}