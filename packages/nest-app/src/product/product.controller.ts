import { Body, Controller, Post, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { SearchProductDto } from './dtos';
import { createReadStream } from 'fs';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    // @UseGuards()
    @Post('export-file')
    @Post('signup')
    async SignUpController(
        @Body() dto : SearchProductDto,
        @Res({ passthrough: true }) res: Response
    )  {
        const data : Uint8Array = await this.productService.GetReportProduct(dto)
        return new StreamableFile(data, {
            type: 'text/csv',
            disposition: 'attachment; filename="report-product.csv"',
          });
    }

}
