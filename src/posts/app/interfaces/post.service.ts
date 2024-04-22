import { CreatePostCommand } from '../commands';

export interface PostService {
  createPost(command: CreatePostCommand): Promise<void>;
}
export const POST_SERVICE_TOKEN = Symbol('PostService');
