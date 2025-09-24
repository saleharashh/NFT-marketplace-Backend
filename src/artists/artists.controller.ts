import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from 'src/entities/Artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get('getArtist')
  getProfile() {
    return this.artistsService.getById(1);
  }

  @Post('createArtist')
  createArtist(@Body() body: Artist) {
    return this.artistsService.createArtist(body);
  }
}
