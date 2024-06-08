import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.HOME.TEXT',
    iconType: 'feather',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/dashboard/main',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD1',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/dashboard/dashboard2',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD2',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'advance-table',
    title: 'MENUITEMS.ADVANCE-TABLE.TEXT',
    iconType: 'feather',
    icon: 'trello',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },

  {
    path: '/dashboard/chat',
    title: 'chat',
    iconType: 'feather',
    icon: 'trello',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: '-- Pages',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Authentication',
    iconType: 'feather',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/forgot',
        title: 'Forgot Password',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/reset',
        title: 'Reset Password',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/page404',
        title: '404 - Not Found',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/page500',
        title: '500 - Server Error',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Extra Pages',
    iconType: 'feather',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Multi level Menu',
    iconType: 'feather',
    icon: 'chevrons-down',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/multilevel/first1',
        title: 'First',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/',
        title: 'Second',
        iconType: '',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [
          {
            path: '/multilevel/secondlevel/second1',
            title: 'Second 1',
            iconType: '',
            icon: '',
            class: 'ml-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/',
            title: 'Second 2',
            iconType: '',
            icon: '',
            class: 'ml-sub-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [
              {
                path: '/multilevel/thirdlevel/third1',
                title: 'third 1',
                iconType: '',
                icon: '',
                class: 'ml-menu3',
                groupTitle: false,
                badge: '',
                badgeClass: '',
                submenu: [],
              },
            ],
          },
        ],
      },
      {
        path: '/multilevel/first3',
        title: 'Third',
        iconType: '',
        icon: '',
        class: 'ml-menu2',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
];
