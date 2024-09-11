import { Perfume } from "@/types/Perfume"

export default function ShapeCard({ name, img, brand, cost, id }: Perfume) {
    return (
        <div className="card border-neutral h-80 my-[10px] w-[250px] rounded-none border shadow-xl">
            <figure className="h-[60%] overflow-hidden">
                <a href={`/product/${id}`} target="_blank" rel="noopener noreferrer"><img style={{ backgroundColor: 'white' }}
                    src={img}
                    alt={name} /></a>
            </figure>
            <div className="card-body p-4" style={{
                gap: '0.2rem',
                lineHeight: '1rem',
            }}>
                <h5 className="card-title text-center block text-base"><p className="line-clamp-2">{name}</p></h5>
                <div className="flex-1"></div>
                <h6 className="text-center block text-sm underline"><p className="line-clamp-1">{brand}</p></h6>
                <h6 className="text-center block font-bold text-red-500">{cost}</h6>
            </div>
        </div>
    )
}