import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInfoEntity, DeliveryInfoEntity, OrderEntity, OrderProductEntity } from 'src/types/order';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';
import { createOrderDto, SearchOrderDto, updateOrderDto } from './dtos';
import { ProductEntity } from 'src/types/product';

@Injectable()
export class OrderService {
    constructor(
        private config: ConfigService,
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @InjectRepository(DeliveryInfoEntity) private deliveryRepository: Repository<DeliveryInfoEntity>,
        @InjectRepository(CustomerInfoEntity) private customerRepository: Repository<CustomerInfoEntity>,
        @InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    ) { }

    async getOrderDetail(time: string = 'week') {

        let dateCondition: string;
    
        switch (time) {
            case 'week':
                dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
                break;
            case 'month':
                dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
                break;
            case 'year':
                dateCondition = "DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                break;
            default:
                throw new ForbiddenException('Invalid time period');
        }
    
        return await this.orderProductRepository
            .createQueryBuilder('orderProduct')
            .select('orderProduct.productId', 'productId')
            .addSelect('SUM(orderProduct.quantity)', 'totalQuantity')
            .leftJoin('orderProduct.order', 'order')
            .where('order.created_at >= ' + dateCondition)
            .groupBy('orderProduct.productId')
            .orderBy('totalQuantity', 'DESC')
            .getRawMany(); 
    }
    
    

    private CheckRoleUser(user: UserEntity) {
        if (!user.role.includes("ADMIN") && !user.role.includes("SALES")) {
            throw new ForbiddenException('The user does not have permission');
        }
    }

    private async getProductDetail(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                id: productId
            }
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }
        return product
    }
    async SearchOrderWithOptionsServices(dto: SearchOrderDto, user: UserEntity) {
        this.CheckRoleUser(user);

        const query = this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.customerInfo', 'customerInfo')
            .leftJoinAndSelect('order.deliveryInfo', 'deliveryInfo')
            .leftJoinAndSelect('order.orderProducts', 'orderProducts')
            .leftJoinAndSelect('orderProducts.product', 'product');

        if (dto.orderId) {
            query.andWhere('order.id = :orderId', { orderId: dto.orderId });
        }

        if (dto.email) {
            query.andWhere('customerInfo.email = :email', { email: dto.email });
        }

        if (dto.firstName) {
            query.andWhere('customerInfo.firstName = :firstName', { firstName: dto.firstName });
        }

        if (dto.lastName) {
            query.andWhere('customerInfo.lastName = :lastName', { lastName: dto.lastName });
        }

        if (dto.phoneNumber) {
            query.andWhere('customerInfo.phoneNumber = :phoneNumber', { phoneNumber: dto.phoneNumber });
        }

        const orders = await query.getMany();

        return orders;
    }

    async CreateOderService(dto: createOrderDto, user: UserEntity) {
        this.CheckRoleUser(user)


        const customerInfo = this.customerRepository.create(dto.customerInfo);
        await this.customerRepository.save(customerInfo);

        const deliveryInfo = this.deliveryRepository.create(dto.deliveryInfo);
        await this.deliveryRepository.save(deliveryInfo);

        const order = this.orderRepository.create({
            ...dto,
            deliveryInfo,
            customerInfo,
            isDisplay: true,
            isPaid: false,
            totalAmount: 0
        });

        const savedOrder = await this.orderRepository.save(order);

        let totalAmount = 0;
        for (const product of dto.orderProducts) {
            const productData = await this.getProductDetail(product.productId)
            const orderProduct = this.orderProductRepository.create({
                productId: productData.id,
                orderId: savedOrder.id,
                quantity: product.quantity,
                discount: product.discount ? product.discount : 0,
                unitPrice: productData.displayCost
            });
            totalAmount += orderProduct.unitPrice * product.quantity;
            await this.orderProductRepository.save(orderProduct);
        }

        savedOrder.totalAmount = totalAmount;
        await this.orderRepository.save(savedOrder);

        return savedOrder;
    }


    async UpdateOrderService(dto: updateOrderDto, user: UserEntity) {
        this.CheckRoleUser(user);

        const order = await this.orderRepository.findOne({
            where: {
                id: dto.orderId
            }
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${dto.orderId} not found`);
        }


        if (dto.status) {
            order.status = dto.status;
        }

        if (dto.isPaid !== undefined) {
            order.isPaid = dto.isPaid
        }

        await this.orderRepository.save(order);

        return order;
    }

    async GetOrderById(orderId: number, user: UserEntity) {
        this.CheckRoleUser(user);

        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['deliveryInfo', 'customerInfo', 'orderProducts', 'orderProducts.product']
        });

        if (!order) throw new Error(`Order with ID ${orderId} not found`);

        return order;
    }


}
