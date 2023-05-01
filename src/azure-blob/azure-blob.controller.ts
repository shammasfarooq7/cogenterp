import { Controller, Get, Header, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from './azure-blob.service';

@Controller('azure-blob')
export class AzureBlobController {
  constructor(private readonly azureBlobService: AzureBlobService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file: Express.Multer.File):Promise<string>{
    const url = await this.azureBlobService.upload(file);
    return url;
  }

  @Get('read')
  @Header('Content-Type','image/webp')
  async readImage(@Res() res,@Query('filename') filename){
    const file = await this.azureBlobService.downloadfile(filename);
    return file.pipe(res);
  }
  @Get('download')
  @Header('Content-Type','image/webp')
  @Header('Content-Disposition', 'attachment; filename=test.webp')
  async downloadImage(@Res() res,@Query('filename') filename){
    const file = await this.azureBlobService.downloadfile(filename);
    return file.pipe(res);
  }

  @Get('delete')
    async delete(@Query('filename') filename){
    await this.azureBlobService.delete(filename);
    return "deleted";
  }
}
