import ImageGallery from '@/components/Gallery'
import TopPerfumeCarousel from '@/components/Carousel/TopPerfumeCarousel'
import { Perfume, Product } from '@/types';
import { GetProductForSearch, GetProductById } from '@/lib/api';
import { SearchProductDto } from '@/lib/dtos/product'
import slugify from 'slugify'


export default async function Page({
    params
}: {
    params: { id: number }
}) {

    const product: Product = await GetProductById(params.id)

    const brandFilter: SearchProductDto = {
        index: 1,
        count: 10,
        brand: [{ type: "brand", value: product.details.brand.value }]
    }

    const linkedPerfume = (await GetProductForSearch(brandFilter)).data

    const imageUrls = product.details.imgDisplay.map(img => img.url)

    return (
        <div className="bg-base-100">
            <div className="pt-8 m-auto flex flex-row xl:container">
                <div className="w-[300px]">
                    <ImageGallery images={imageUrls} />
                </div>
                <div className="sumary-product flex-1 p-6">
                    <div className="flex flex-row">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="badge badge-secondary ml-2 self-center">{product.details.sex.value}</div>
                        <div className="flex-1"></div>
                        <input type="checkbox" className="self-center checkbox checkbox-error mask mask-heart bg-red-400" />
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Giá sản phẩm:</h3>
                        <h3 className="text-red-500 font-bold text-[18px] mb-[4px]">{product.displayCost}</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Lượng hàng còn lại:</h3>
                        <h3 className="text-[18px] mb-[4px]">{product.stockQuantity}</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-[18px] mb-[4px]">Số lượng đã bán:</h3>
                        <h3 className="text-[18px] mb-[4px]">{product.buyCount}</h3>
                    </div>
                    <div className="divider"></div>
                    <h3 className="text-[18px] mb-[4px]">Dung tích: </h3>
                    <div>
                        <button className="btn btn-outline btn-sm">100ML</button>
                        <button className="btn btn-outline btn-sm">10ML</button>
                    </div>
                    <h4 className="text-red-500 float-right text-xs"> HOTLINE 0325986545</h4>
                </div>
                <div className="p-4 w-[400px] border-4 rounded-lg border-neutral">
                    <h1 className="font-bold uppercase">THÔNG TIN SẢN PHẨM</h1>
                    <div className="product-property flex flex-col">
                        <div className="h-16 flex border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-info-1.svg)',
                                    WebkitMask: 'url(/icons/ic-info-1.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Thương hiệu: </h3>
                            <a href={`/showroom/brand/${slugify(product.details.brand.value, { strict: true, lower: true })}`}
                                className="h-5 self-center underline">
                                {product.details.brand.value}
                            </a>
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-info-2.svg)',
                                    WebkitMask: 'url(/icons/ic-info-2.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Dung tích: </h3>
                            {product.details.size.map((item, index) => (
                                <a key={index} href={`/showroom/size/${slugify(item.value, { strict: true, lower: true })}`}
                                    className="h-5 self-center underline">
                                    {item.value}
                                </a>
                            )) }
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-info-3.svg)',
                                    WebkitMask: 'url(/icons/ic-info-3.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Lưu hương: {product.details.sillage.value}</h3>
                        </div>
                        <div className="h-16 flex flex-row border-b border-neutral">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-info-4.svg)',
                                    WebkitMask: 'url(/icons/ic-info-4.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Tỏa hương: {product.details.longevity.value}</h3>
                        </div>
                        <div className="h-16 flex flex-row">
                            <div
                                className="h-full w-10 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-info-5.svg)',
                                    WebkitMask: 'url(/icons/ic-info-5.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 h-5 self-center">Giới tính: </h3>
                            <a href={`/showroom/sex/${slugify(product.details.sex.value, { strict: true, lower: true })}`} 
                                className="h-5 self-center underline">
                                {product.details.sex.value}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:container m-auto mt-24 flex flex-row relative">
                <div className="flex-1 mr-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" style={{ width: "200px !important", height: "50px !important" }} name="my_tabs_2" role="tab" className="tab" value="haizz" aria-label="Mô tả sản phẩm" defaultChecked />
                        <div role="tabpanel" style={{ whiteSpace: 'pre-line' }} className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <div>{product.details.description}</div>
                        </div>

                        <input type="radio" style={{ width: "200px !important", height: "50px !important" }} name="my_tabs_2" role="tab" className="tab" aria-label="Sử dụng và Bảo quản"  />
                        <div role="tabpanel" style={{ whiteSpace: 'pre-line' }} className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <div>{product.details.tutorial}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-[400px] border-4 rounded-lg border-neutral block" style={{
                        height: "fit-content"
                }}>
                    <h1 className="font-bold uppercase">QUYỂN LỢI KHÁCH HÀNG</h1>
                    <div className="product-property flex flex-col">
                        <div className="flex border-b border-neutral">
                            <div
                                className="h-20 w-20 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-benefit.svg)',
                                    WebkitMask: 'url(/icons/ic-benefit.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 self-center">Cam kết sản phẩm chính hãng 100% (đền 200% giá trị sản phẩm nếu phát hiện hàng giả)</h3>
                        </div>
                        <div className="flex border-b border-neutral">
                            <div
                                className="h-20 w-20 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-benefit-2.svg)',
                                    WebkitMask: 'url(/icons/ic-benefit-2.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 self-center">Chính sách đổi hàng và tích điểm thành viên</h3>
                        </div>
                        <div className="flex content-center">
                            <div
                                className="h-20 w-20 bg-white mask mask-center"
                                style={{
                                    flex: "0 0 60px",
                                    mask: 'url(/icons/ic-benefit-3.svg)',
                                    WebkitMask: 'url(/icons/ic-benefit-3.svg) no-repeat center',
                                }}
                            ></div>
                            <h3 className="ml-3 self-center">Tư vấn & hỗ trợ gói quà miễn phí cho khách hàng</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:container m-auto mt-20 mb-10">
                <h1 className="text-3xl font-bold mb-5">SẢN PHẨM LIÊN QUAN</h1>
                <TopPerfumeCarousel Perfume={linkedPerfume} reverse={true} />
            </div>
            <div className="h-10 bg-neutral w-full glass"></div>
        </div>
    )
}
