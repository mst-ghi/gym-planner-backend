import * as dayjs from 'dayjs';
import { StorageService } from '@app/storage';
import { Inject, Injectable } from '@nestjs/common';
import { BaseService, MediaSelect, MediaStorageEnum } from '@app/shared';

@Injectable()
export class UploaderService extends BaseService {
  @Inject(StorageService)
  private readonly storageService: StorageService;

  async upload(request: any): Promise<any> {
    let file = null;

    try {
      file = await this.storageService.setRequestProperty('file').put(request);
    } catch (error) {
      this.catchError(error, 'UploaderService');
    }

    if (file) {
      try {
        const data = {
          workspace_id: request.workspaceId,
          user_id: request.userId,
          originalname: file.originalname,
          mimetype: file.mimetype,
          filename: file.key,
          url: file.location,
          storage: MediaStorageEnum.Liara,
          size: file.size,
        };

        return await this.prisma.media.create({ data, select: MediaSelect });
      } catch (error) {
        await this.storageService.delete(file.key);
        this.catchError(error, 'UploaderService');
      }
    }

    this.badRequestException();
  }

  async delete(mediaUrl: string) {
    const media = await this.prisma.media.findFirst({
      where: { url: mediaUrl },
    });

    if (media) {
      try {
        //! @todo: implement scheduler for completely delete file from storage and db
        // await this.storageService.delete(media.filename);
        await this.prisma.media.update({
          where: { id: media.id },
          data: { deleted_at: dayjs().toISOString() },
        });
      } catch (error) {
        this.catchError(error);
      }
    }
  }
}
