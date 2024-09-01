type Perfume = {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

export default function ShapeCard({ name, img, description, cost }: Perfume) {
    return (
        <div className="card border-neutral h-80 w-[250px] my-[10px] rounded-none border shadow-xl">
            <figure className="h-[60%] overflow-hidden">
                <img style={{ backgroundColor: 'white' }}
                    src={img}
                    alt={name} />
            </figure>
            <div className="card-body p-4" style={{
                gap: '0.2rem',
                lineHeight: '1rem',
            }}>
                <h2 className="card-title text-center block">{name}</h2>
                <p className="text-center block text-sm">{description}</p>
                <h1 className="text-center block font-bold">{cost}</h1>
            </div>
        </div>
    )
}