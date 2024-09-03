import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageDetailEntity, ProductDetailEntity, ProductEntity, TagsEntity } from 'src/types/product';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';
import { CreateProductDto, DeleteProductDto, ProductDetailInp, SearchProductDto, UpdateProductDto } from './dtos';

@Injectable()
export class ProductService {
    constructor(
        private config: ConfigService,
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductDetailEntity) private productDetailRepository: Repository<ProductDetailEntity>,
        @InjectRepository(ImageDetailEntity) private imageDetailRepository: Repository<ImageDetailEntity>,
        @InjectRepository(TagsEntity) private tagsRepository: Repository<TagsEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {}

    private CheckRoleUser(user: UserEntity) {
        if (!user.role.includes("ADMIN") && !user.role.includes("WEREHOUSEMANAGER")) {
            throw new ForbiddenException('The user does not have permission');
        }
    }

    async SearchProductWithOptionsService(dto: SearchProductDto) {
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        queryBuilder.andWhere('product.isDisplay = :isDisplay', { isDisplay: true });
    
        if (dto.name) {
            queryBuilder.andWhere('product.name LIKE :name', { name: `%${dto.name}%` });
        }

        if (dto.rangeMoney && dto.rangeMoney.length === 2) {
            const [min, max] = dto.rangeMoney;
            queryBuilder.andWhere('product.displayCost BETWEEN :min AND :max', { min, max });
        }
    
        if (dto.size && dto.size.length > 0) {
            queryBuilder
                .leftJoinAndSelect('product.details', 'details')
                .leftJoinAndSelect('details.size', 'size')
                .andWhere('size.value IN (:...sizes)', { sizes: dto.size.map(tag => tag.value.toLowerCase()) });
        }
    
        if (dto.brand && dto.brand.length > 0) {
            queryBuilder
                .leftJoinAndSelect('product.details', 'details')
                .leftJoinAndSelect('details.brand', 'brand')
                .andWhere('brand.value IN (:...brands)', { brands: dto.brand.map(tag => tag.value.toLowerCase()) });
        }
    
        if (dto.fragranceNotes && dto.fragranceNotes.length > 0) {
            queryBuilder
                .leftJoinAndSelect('product.details', 'details')
                .leftJoinAndSelect('details.fragranceNotes', 'fragranceNotes')
                .andWhere('fragranceNotes.value IN (:...fragranceNotes)', { fragranceNotes: dto.fragranceNotes.map(tag => tag.value.toLowerCase()) });
        }
    
        if (dto.concentration && dto.concentration.length > 0) {
            queryBuilder
                .leftJoinAndSelect('product.details', 'details')
                .leftJoinAndSelect('details.concentration', 'concentration')
                .andWhere('concentration.value IN (:...concentrations)', { concentrations: dto.concentration.map(tag => tag.value.toLowerCase()) });
        }
   
        if (dto.sex && dto.sex.length > 0) {
            queryBuilder
                .leftJoinAndSelect('product.details', 'details')
                .leftJoinAndSelect('details.sex', 'sex')
                .andWhere('sex.value IN (:...sexes)', { sexes: dto.sex.map(tag => tag.value.toLowerCase()) });
        }
    
        return await queryBuilder.getMany();
    }
    

    async GetProductByIdService(productId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId, isDisplay: true },
            relations: [
                'details',
                'details.imgDisplay',
                'details.size',
                'details.brand',
                'details.fragranceNotes',
                'details.concentration',
                'details.sex',
            ],
        });

        if (!product) {
            throw new ForbiddenException('Product not found or not available');
        }

        return product;
    }

    private async findOrCreateTag(tagValue: string, tagType: string): Promise<TagsEntity> {
        const tagLowerCase = tagValue.toLowerCase();
        let tag = await this.tagsRepository.findOne({ where: { value: tagLowerCase, type: tagType } });

        if (!tag) {
            tag = this.tagsRepository.create({ value: tagLowerCase, type: tagType });
            tag = await this.tagsRepository.save(tag);
        }

        return tag;
    }

    async CreateProductService(dto: CreateProductDto, user: UserEntity) {
        this.CheckRoleUser(user);

        const existingProduct = await this.productRepository.findOne({
            where: { name: dto.name, category: dto.category },
        });

        if (existingProduct) {
            throw new ForbiddenException('Product already exists with the same name and category.');
        }

        // Save image details
        const imgDetails = dto.details.imgDisplay.map((img) => 
            this.imageDetailRepository.create({ url: img.url, link: img.link || [] })
        );
        const savedImgDetails = await this.imageDetailRepository.save(imgDetails);

        // Process all TagsEntity fields
        const sizeTag = await this.findOrCreateTag(dto.details.size.value, 'size');
        const brandTag = await this.findOrCreateTag(dto.details.brand.value, 'brand');
        const fragranceNotesTag = await this.findOrCreateTag(dto.details.fragranceNotes.value, 'fragranceNotes');
        const concentrationTag = await this.findOrCreateTag(dto.details.concentration.value, 'concentration');
        const sexTag = await this.findOrCreateTag(dto.details.sex.value, 'sex');


        // Save product detail
        const newProductDetail = this.productDetailRepository.create({
            size: sizeTag,
            brand: brandTag,
            fragranceNotes: fragranceNotesTag,
            concentration: concentrationTag,
            sex: sexTag,
            description: dto.details.description || '',
            imgDisplay: savedImgDetails,
        });

        const savedProductDetail = await this.productDetailRepository.save(newProductDetail);

        // Save product
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
        this.CheckRoleUser(user);

        const product = await this.productRepository.findOne({ where: { id: dto.productId } });

        if (!product) {
            throw new ForbiddenException('Product not found');
        }

        product.isDisplay = false;
        await this.productRepository.save(product);

        return { message: 'Product successfully soft deleted' };
    }

    private async updateProductDetails(details: ProductDetailEntity, dtoDetails: ProductDetailInp): Promise<ProductDetailEntity> {
        if (dtoDetails.size) {
            details.size = await this.findOrCreateTag(dtoDetails.size.value, 'size');
        }
    
        if (dtoDetails.brand) {
            details.brand = await this.findOrCreateTag(dtoDetails.brand.value, 'brand');
        }
    
        if (dtoDetails.fragranceNotes) {
            details.fragranceNotes = await this.findOrCreateTag(dtoDetails.fragranceNotes.value, 'fragranceNotes');
        }
    
        if (dtoDetails.concentration) {
            details.concentration = await this.findOrCreateTag(dtoDetails.concentration.value, 'concentration');
        }
    
        if (dtoDetails.sex) {
            details.sex = await this.findOrCreateTag(dtoDetails.sex.value, 'sex');
        }
    
        if (dtoDetails.description) {
            details.description = dtoDetails.description;
        }
    
        if (dtoDetails.imgDisplay) {
            const existingImageDetails = await this.imageDetailRepository.find();
            const existingImageUrls = new Set(existingImageDetails.map(img => img.url));
            const newImages = await Promise.all(dtoDetails.imgDisplay.map(img => {
                if (!existingImageUrls.has(img.url)) {
                    const newImageDetail = this.imageDetailRepository.create({
                        url: img.url,
                        link: img.link || [],
                    });
                    return this.imageDetailRepository.save(newImageDetail);
                }
                return null;
            }));
            const filteredNewImages = newImages.filter(img => img !== null);
            details.imgDisplay = [...existingImageDetails, ...filteredNewImages];
        }
        return await this.productDetailRepository.save(details);
    }
    

    async UpdateProductService(dto: UpdateProductDto, user: UserEntity) {
        this.CheckRoleUser(user);

        const product = await this.productRepository.findOne({
            where: { id: dto.productId, isDisplay: true },
        });

        if (!product) {
            throw new ForbiddenException('Product not found or is not available for update');
        }

        if (dto.name) product.name = dto.name;
        if (dto.originCost !== undefined) product.originCost = dto.originCost;
        if (dto.displayCost !== undefined) product.displayCost = dto.displayCost;
        if (dto.stockQuantity !== undefined) product.stockQuantity = dto.stockQuantity;
        if (dto.category) product.category = dto.category;

        if (dto.details) {
            product.details = await this.updateProductDetails(product.details, dto.details);
        }

        return await this.productRepository.save(product);

    }
}
