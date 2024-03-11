import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById() {}

  @Post()
  createBookmark() {}

  @Patch()
  editBookmark() {}

  @Delete()
  deleteBookmark() {}
}
