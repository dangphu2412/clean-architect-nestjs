import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  POST_SERVICE_TOKEN,
  PostService,
} from '../app/interfaces/post.service';
import { CreatePostDto } from './dtos/create-post.dto';

@ApiTags('posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(
    @Inject(POST_SERVICE_TOKEN)
    private readonly postService: PostService,
  ) {}

  // @Identified
  @Post('/')
  @ApiCreatedResponse()
  createPost(@Body() dto: CreatePostDto) {
    const mapToCommand = (dto: CreatePostDto) => ({
      name: dto.name,
      content: dto.content,
    });

    return this.postService.createPost(mapToCommand(dto));
  }
}
