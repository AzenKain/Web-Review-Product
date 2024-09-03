import Page from './[SSR]page'

export default async function HomeLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { id: string[] }; 
}) {
    const perfumes = await getPerfumes();

    return (
        <>
            {params.id ? children : <Page perfumes={perfumes} />}
        </>
    );
}

function getPerfumes() {
    return (
        [
            {
                "img": "/images/atelier.png",
                "name": "ATELIER MATERI",
                "description": "Atelier Materi Santal Blond EDP",
                "cost": "6,500,000 VND"
            },
            {
                "img": "/images/clive.png",
                "name": "CLIVE CHRISTIAN",
                "description": "Clive Christian E Cashmere Musk",
                "cost": "12,200,000 VND"
            },
            {
                "img": "/images/borntostandout.png",
                "name": "BORNTOSTANDOUT",
                "description": "BTSO Dirty Rice EDP",
                "cost": "5,330,000 VND"
            },
            {
                "img": "/images/gritti.png",
                "name": "GRITTI",
                "description": "Neroli Extreme Gritti",
                "cost": "5,500,000 VND"
            },
            {
                "img": "/images/fusciuni.png",
                "name": "FUSCIUNI CAT",
                "description": "Fusciuni Little Song",
                "cost": "6,900,000 VND"
            }
        ]
    )
}
