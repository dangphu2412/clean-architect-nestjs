import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { omit, keyBy } from 'lodash';
import { Menu } from '../../menu';

type InsertMenu = Omit<Menu, 'id' | 'parent' | 'subMenus' | 'parentId'> & {
  subMenus?: InsertMenu[];
};

export class SeedingMenus1659108460003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const menuRepository = queryRunner.manager.getTreeRepository(Menu);
    const menus: InsertMenu[] = [
      {
        name: 'User Management',
        iconCode: 'USER_MANAGEMENT_ICON',
        code: 'USER_MANAGEMENT',
        subMenus: [
          {
            name: 'Administrator',
            accessLink: '/users/admin',
            code: 'ADMIN',
          },
          {
            name: 'Accessibility',
            accessLink: '/users/access-control',
            code: 'ACCESS_CONTROL',
          },
        ],
      },
      {
        name: 'Recruitment',
        iconCode: 'RECRUITMENT_ICON',
        code: 'RECRUITMENT',
        subMenus: [
          {
            name: 'Recruitment management',
            accessLink: '/recruitments/overview',
            code: 'RECRUITMENT_OVERVIEW',
          },
        ],
      },
    ];

    const createdParent = await menuRepository.save(
      menus
        .map(SeedingMenus1659108460003.excludeSubMenus)
        .map((menu) => menuRepository.create(menu)),
    );

    const childMenu = await menuRepository.save(
      menus
        .map((menu) => {
          return menu.subMenus
            ? menu.subMenus.map((subMenu) => menuRepository.create(subMenu))
            : [];
        })
        .flat(),
    );

    const parentKeyByCode = keyBy(createdParent, 'code');
    const childMenuKeyByCode = keyBy(childMenu, 'code');

    await menuRepository.save(
      menus.map((menu) => {
        const menuEntity = parentKeyByCode[menu.code];
        if (menu.subMenus) {
          menuEntity.subMenus = menu.subMenus.map((subMenu) => {
            return childMenuKeyByCode[subMenu.code];
          });
        }
        return menuEntity;
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const menuRepository = queryRunner.manager.getTreeRepository(Menu);
    await menuRepository.delete({
      code: In([
        'USER_MANAGEMENT',
        'ADMIN',
        'ACCESS_CONTROL',
        'RECRUITMENT',
        'RECRUITMENT_OVERVIEW',
      ]),
    });
  }

  private static excludeSubMenus(
    menu: InsertMenu,
  ): Omit<InsertMenu, 'subMenus'> {
    return menu.subMenus ? omit(menu, 'subMenus') : { ...menu };
  }
}
