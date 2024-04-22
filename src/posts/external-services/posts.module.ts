import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { POST_SERVICE_TOKEN } from '../app/interfaces/post.service';
import { PostImplService } from '../app/post-impl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../domain';
import { POST_REPOSITORY_TOKEN } from '../app/interfaces/post.repository';
import { PostRepositoryImpl } from './repostitories';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [
    { provide: POST_SERVICE_TOKEN, useClass: PostImplService },
    {
      provide: POST_REPOSITORY_TOKEN,
      useClass: PostRepositoryImpl,
    },
  ],
  exports: [],
})
export class PostsModule {}
