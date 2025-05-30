import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CultureContentService } from './culture_content.service';
import {
  CreateCultureContentDto,
  // Removed: UpdateCultureContentDto (commented out in DTO file)
} from './dto/culture_content.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('culture-content')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
export class CultureContentController {
  constructor(private readonly cultureContentService: CultureContentService) {}

  // @Post()
  // create(@Body() createCultureContentDto: CreateCultureContentDto) {
  //   return this.cultureContentService.create(createCultureContentDto);
  // }

  @Get('latest')
  findLatest() {
    return this.cultureContentService.findLatest();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cultureContentService.findOne(id);
  }

  @Get()
  findAll() {
    return this.cultureContentService.findAll();
  }

  @Post('image')
    @UseInterceptors(FileInterceptor('file')) 
    async getCultureContentByImage(
      @UploadedFile() file: Express.Multer.File
    ) {
      return this.cultureContentService.getCultureContentByImage(file)
    }
}
