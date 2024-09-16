import { Body, Controller, Post, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { SearchOrderDto } from './dtos';
import { JwtGuardRestApi } from 'src/auth/guard';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @UseGuards(JwtGuardRestApi)
    @Post('export-file')
    async ExportFileController(
        @Body() dto : SearchOrderDto,
        @Res({ passthrough: true }) res: Response
    )  {
        const data : Uint8Array = await this.orderService.GetReportOrder(dto)
        return new StreamableFile(data, {
            type: 'text/csv',
            disposition: 'attachment; filename="report-product.csv"',
          });
    }
}
