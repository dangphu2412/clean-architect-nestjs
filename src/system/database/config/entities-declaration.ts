import { join } from 'path';
import { User } from '../../../account-service/user';
import { Role } from '../../../account-service/authorization';
import { Menu } from '../../menu';
import { Permission } from '../../../account-service/authorization/client/entities/permission.entity';
import { Posts } from '../../../posts/domain';

export const APP_ENTITIES = [User, Role, Menu, Permission, Posts];

export const MIGRATION_CONFIGS = {
  migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};
