import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageDetailEntity, ProductDetailEntity, ProductEntity } from 'src/types/product';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dtos';
import { ID } from '@nestjs/graphql';

@Injectable()
export class ProductService {
    constructor(
        private config: ConfigService,
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductDetailEntity) private productDetailRepository: Repository<ProductDetailEntity>,
        @InjectRepository(ImageDetailEntity) private imageDetailRepository: Repository<ImageDetailEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) { }

    private CheckRoleUser(user: UserEntity){
        if (
            !(
                user.role.includes("ADMIN") ||
                user.role.includes("WEREHOUSEMANGER")
            )
        ) {
            throw new ForbiddenException(
                'The user have not permission',
            );
        }
    }
    async GetProductByIdService(productId: number, user: UserEntity) {
        this.CheckRoleUser(user);
    
        return await this.productRepository.findOne({
            where: {
                id: productId
            },
            relations: ['details', 'details.imgDisplay'] 
        });
    }
      
    async CreateProductService(dto: CreateProductDto, user: UserEntity) {
   
        this.CheckRoleUser(user);
        const imgDetails = dto.details.imgDisplay.map((img) => {
            const newImageDetail = this.imageDetailRepository.create({
                url: img.url,
                link: img.link ? img.link : [], 
            });
            return newImageDetail;
        });
        const savedImgDetails = await this.imageDetailRepository.save(imgDetails);
    
        const newProductDetail = this.productDetailRepository.create({
            size: dto.details.size,
            brand: dto.details.brand,
            tags: dto.details.tags ? dto.details.tags : [],
            fragranceNotes: dto.details.fragranceNotes ? dto.details.fragranceNotes : [],
            description: dto.details.description ? dto.details.description : '',
            imgDisplay: savedImgDetails, 
        });
    
    
        const savedProductDetail = await this.productDetailRepository.save(newProductDetail);
    
    
        const newProduct = this.productRepository.create({
            name: dto.name,
            originCost: dto.originCost,
            displayCost: dto.displayCost,
            isDisplay: true,
            stockQuantity: dto.stockQuantity,
            category: dto.category,
            details: savedProductDetail, 
        });
    

        return await this.productRepository.save(newProduct);
    }
    

    async DeleteProductService(dto: DeleteProductDto, user: UserEntity) {
        this.CheckRoleUser(user)
    }

    async UpdateProductService(dto: UpdateProductDto, user: UserEntity) {
        this.CheckRoleUser(user)
    }
}
