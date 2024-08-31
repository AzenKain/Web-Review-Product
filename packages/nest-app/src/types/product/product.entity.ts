import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { OrderProductEntity } from "../order";

@Entity({ name: 'ProductDetail' })
export class ProductDetailEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToMany(() => ImageDetailEntity, (img) => img.productDetail)
    imgDisplay: ImageDetailEntity[];

    @Column()
    size: string;

    @Column()
    brand: string;

    @Column({ type: 'simple-array', nullable: true })
    tags?: string[];

    @Column({ type: 'simple-array', nullable: true })
    fragranceNotes?: string[];

    @Column({ nullable: true })
    description?: string;
}
@Entity({ name: 'ImageDetail' })
export class ImageDetailEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    url: string;

    @Column({type: 'simple-array', nullable: true })
    link?: string[];

    @ManyToOne(() => ProductDetailEntity, (pd) => pd.imgDisplay, { nullable: true })
    productDetail: ProductDetailEntity;
}
@Entity({ name: 'Product' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column({ type: 'boolean' })
    isDisplay: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    originCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    displayCost: number;

    @Column({ type: 'bigint' })
    stockQuantity: number;

    @Column()
    category: string;

    @Column({ type: 'bigint', nullable: true, default: 0 })
    buyCount?: number;

    @Column({ type: 'float', nullable: true, default: 0 })
    rating?: number;

    @OneToOne(() => ProductDetailEntity)
    @JoinColumn()
    details: ProductDetailEntity;
    
    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    orderProducts: OrderProductEntity[];
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
