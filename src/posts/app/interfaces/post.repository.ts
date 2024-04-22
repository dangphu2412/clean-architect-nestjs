import { Posts } from '../../domain';

export interface PostRepository {
  createPost(entity: Posts): Promise<void>;
}

export const POST_REPOSITORY_TOKEN = Symbol('POST_REPOSITORY_TOKEN');
