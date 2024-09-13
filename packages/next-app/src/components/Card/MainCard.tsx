"use client"
import { Perfume } from '@/types/Perfume';
import React, { useEffect } from 'react';
import Image from 'next/image';



const MainCard: React.FC<{ item: Perfume }> = ({ item }) => {
    useEffect(() => {
        console.log(item)
    }, [])

    return (
        <div className="card glass h-[450px] max-h-[80vh] w-full shadow-xl">
            <figure className="w-full h-[60%]">
                <a href={`/product/${item.id}`}>
                    <Image
                        src={item.img as string}
                        alt={item.name}
                        className="bg-white w-full"
                        style={{ aspectRatio: 1 }}
                        layout="responsive"
                        width={500}
                        height={500}
                    />
                </a>
            </figure>
            <div className="card-body">
                <h5 className="card-title text-center block "><p className="line-clamp-1">{item.brand}</p></h5>
                <h6 className="text-center"><p className="line-clamp-2">{item.name}</p></h6>
                <h6 className="text-center">{item.cost}</h6>
            </div>
        </div>
    );
};

export default MainCard;
