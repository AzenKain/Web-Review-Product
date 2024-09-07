import { FC } from 'react'
import ShapeCard from '@/components/Card/ShapeCard'
import Pagination from '@/components/Footer/Pagination'

type Perfume = {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

interface PageProps {
    perfumes: Perfume[];
}

const Page: FC<PageProps> = ({ perfumes }) => {

    return (
        <>
            <div className="flex w-full flex-row flex-wrap justify-between">
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
                {perfumes ? perfumes.map((perfume, index) => (
                    <ShapeCard key={index} name={perfume.name} description={perfume.description} img={perfume.img} cost={perfume.cost} />
                )) : null}
            </div>
            <div className="flex flex-row justify-center mt-10"><Pagination /></div>
        </>
    )
}

export default Page;
