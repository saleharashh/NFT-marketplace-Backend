import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from 'src/entities/Artist.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BaseResponse } from 'src/models/BaseResponse';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get('getArtist')
  async getProfile(@Query('id') id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const artist = await this.artistsService.getById(Number(id));
    return BaseResponse.ok(artist);
  }

  @Get('getAllArtists')
  async getArtists() {
    const artist = await this.artistsService.getAllArtists();
    return BaseResponse.ok(artist);
  }

  @Post('createArtist')
  @UseInterceptors(FilesInterceptor('images', 2))
  async createArtist(
    @Body() body: Artist,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const artist = this.artistsService.createArtist(body, files);
    return BaseResponse.ok(artist);
  }
}
