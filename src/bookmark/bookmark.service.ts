import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async getBookmarks(userId: number) {
    const bookmark =
      await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
    return bookmark;
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });
    return bookmark;
  }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });
    return bookmark;
  }

  async editBookmark(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    //obtener bookmark por id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // verificar si este bookmark le pertenece al usuario
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }

    const bookmarkUpdated =
      await this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: {
          ...dto,
        },
      });
    return bookmarkUpdated;
  }

  deleteBookmark() {}
}
