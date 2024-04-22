import { Module } from '@nestjs/common';
import { DatabaseModule } from './system/database/database.module';
import { UserModule } from './account-service/user/internal/user.module';
import { AuthModule } from './account-service/authentication/internal/auth.module';
import { AuthorizationModule } from './account-service/authorization/internal/authorization.module';
import { SystemModule } from './system/system.module';
import { MenuModule } from './system/menu/internal/menu.module';
import { PostsModule } from './posts/external-services/posts.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    AuthorizationModule,
    SystemModule,
    MenuModule,
    PostsModule,
  ],
})
export class AppModule {}
