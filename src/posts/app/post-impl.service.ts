import { Inject, Injectable } from '@nestjs/common';
import { PostService } from './interfaces/post.service';
import { CreatePostCommand } from './commands';
import {
  POST_REPOSITORY_TOKEN,
  PostRepository,
} from './interfaces/post.repository';
import { Posts } from '../domain';

@Injectable()
export class PostImplService implements PostService {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: PostRepository,
  ) {}
  createPost(command: CreatePostCommand): Promise<void> {
    const postEntity = new Posts();

    postEntity.name = command.name;
    postEntity.slug = command.name + '-' + Date.now();
    postEntity.content = command.content;

    return this.postRepository.createPost(postEntity);
  }
}
