import React from 'react';

interface Perfume {
    img?: string;
    name: string;
    description: string;
    tags: string[];
    href?: string;
    cost: string;
}

const MainCard: React.FC<{ item: Perfume }> = ({ item }) => {
    return (
        <div className="card glass h-[500px] max-h-[80vh] w-full shadow-xl">
            <figure>
                <img src={item.img} alt={item.name} className="bg-white" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
                {item.tags ? (
                    <div className="card-actions justify-end">
                        {item.tags.map((key, index) => (
                            <div key={index} className="badge badge-outline">{key}</div>
                        ))}
                    </div>
                ) : null} 
                <h2>{item.cost}</h2>
            </div>
        </div>
    );
};

export default MainCard;
