import ShapeCard from '@/components/Card/ShapeCard'
import Pagination from '@/components/Footer/Pagination'

export default async function Page() {

    const perfumes = await getPerfumes();

    return (
        <>
            <div className="flex w-full flex-row flex-wrap justify-between">
            {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard id={perfume.id} key={index} name={perfume.name} brand={perfume.brand} img={perfume.img} cost={perfume.cost}  />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard id={perfume.id} key={index} name={perfume.name} brand={perfume.brand} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard id={perfume.id} key={index} name={perfume.name} brand={perfume.brand} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard id={perfume.id} key={index} name={perfume.name} brand={perfume.brand} img={perfume.img} cost={perfume.cost} />
                )) : null}
            </div>
            <div className="flex flex-row justify-center mt-10"><Pagination /></div>
        </>
    )
}

function getPerfumes() {
    return (
        [
            {   
                "id" : 1,
                "img": "/images/atelier.png",
                "brand": "ATELIER MATERI",
                "name": "Atelier Materi Santal Blond EDP",
                "cost": "6,500,000 VND"
            },
            {
                "id" : 2,
                "img": "/images/clive.png",
                "brand": "CLIVE CHRISTIAN",
                "name": "Clive Christian E Cashmere Musk",
                "cost": "12,200,000 VND"
            },
            {
                "id" : 3,
                "img": "/images/borntostandout.png",
                "brand": "BORNTOSTANDOUT",
                "name": "BTSO Dirty Rice EDP",
                "cost": "5,330,000 VND"
            },
            {
                "id" : 4,
                "img": "/images/gritti.png",
                "brand": "GRITTI",
                "name": "Neroli Extreme Gritti",
                "cost": "5,500,000 VND"
            },
            {
                "id" : 5,
                "img": "/images/fusciuni.png",
                "brand": "FUSCIUNI CAT",
                "name": "Fusciuni Little Song",
                "cost": "6,900,000 VND"
            }
        ]
    )
}

