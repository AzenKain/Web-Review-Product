import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
    constructor() {}

    async uploadFileService( file: Express.Multer.File){
        const currentYear = new Date().getFullYear();
        const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    
        const uploadDir = path.join(process.cwd(), 'uploads', `${currentYear}`, `${currentMonth}`);
    
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.originalname);

        fs.writeFileSync(filePath, file.buffer);
    
        const fileUrl = `/uploads/${currentYear}/${currentMonth}/${file.originalname}`;
    
        return { url: fileUrl };
    }
}
