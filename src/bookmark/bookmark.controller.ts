import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getBookmarks() {}

  @Get(':id')
  getBookmarkById() {}

  @Post()
  createBookmark() {}

  @Patch()
  editBookmark() {}

  @Delete()
  deleteBookmark() {}
}
