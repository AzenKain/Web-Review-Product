import React from 'react';

interface Perfume {
    img?: string;
    name: string;
    description: string;
    href?: string;
    cost: string;
}

const MainCard: React.FC<{ item: Perfume }> = ({ item }) => {
    return (
        <div className="card glass h-[450px] max-h-[80vh] w-full shadow-xl">
            <figure className="w-full h-[60%]">
                <img src={item.img} alt={item.name} className="bg-white w-full" style={{aspectRatio: 1}} />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-center block">{item.name}</h2>
                <p className="text-center">{item.description}</p>
                <h2 className="text-center">{item.cost}</h2>
            </div>
        </div>
    );
};

export default MainCard;
