import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NftService } from './nft.service';
import { NFT } from 'src/entities/NFT.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}
  @Get('getNftById')
  async getNftById(@Query('id') id: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.nftService.getById(id);
  }

  @Post('insert')
  @UseInterceptors(FileInterceptor('image'))
  insert(@Body() body: NFT, @UploadedFile() image: Express.Multer.File) {
    return this.nftService.insert(body, image);
  }

  @Get('getByCreatorId')
  async getByCreatorId(@Query('creatorId') creatorId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.nftService.getByCreatorId(creatorId);
  }

  @Get('getByOwnerId')
  async getByOwnerId(@Query('ownerId') ownerId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.nftService.getByOwnerId(ownerId);
  }

  @Get('getAllNfts')
  async getAllNfts() {
    // await new Promise((resolve)
    return this.nftService.getAllNfts();
  }
}
