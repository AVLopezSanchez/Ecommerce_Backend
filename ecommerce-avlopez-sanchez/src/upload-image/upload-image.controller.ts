import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './upload-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { Roles } from 'src/decorates/role.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/Guards/roles.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpeg|png|webp|jpg)$/ }),
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File is too large',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadImage(file, productId);
  }
}
