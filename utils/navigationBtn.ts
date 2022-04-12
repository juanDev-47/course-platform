import { NavBtns } from 'interfaces';

export class NavigationBtn {
  public static ADMIN_NAV_BTNS: NavBtns[] = [
    { label: 'Courses', url: '/courses' },
    { label: 'Users', url: '/users' },
    { label: 'Training Plans', url: '/training-plans' },
    { label: 'Top Employees', url: '/top-employee-training' },
  ];

  public static USER_NAV_BTNS: NavBtns[] = [
    {
      label: 'My Training Plans',
      url: '/training-plans',
      dynamicUrlKey: 'userName',
      isDynamic: true,
    },
  ];
}
