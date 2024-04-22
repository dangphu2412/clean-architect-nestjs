import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../domain';
import { PostRepository } from '../../app/interfaces/post.repository';

@Injectable()
export class PostRepositoryImpl
  extends Repository<Posts>
  implements PostRepository
{
  constructor(
    @InjectRepository(Posts)
    repository: Repository<Posts>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createPost(entity: Posts): Promise<void> {
    await this.save(entity);
  }
}
