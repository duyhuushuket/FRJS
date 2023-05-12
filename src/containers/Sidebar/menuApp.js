export const adminMenu = [
  { // Admin menu
    name: 'menu.menu101', menus: [
      {
        name: 'menu.menu-101.mart', link: '', icon: 'icon-list', key: 'shuket',
        subMenus: [
          { name: 'menu.menu-101.mart-menu.menu1', key: 'mart', link: '/shuket/aaa-manage' },
          { name: 'menu.menu-101.mart-menu.menu2', key: 'mart', link: '/shuket/product-manage' },
          { name: 'menu.menu-101.mart-menu.menu3', key: 'mart', link: '/shuket/register-package-group-or-account' },
        ]
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ]
  },
  { // Mart menu
    name: 'menu.menu301', menus: [
      { name: 'menu.menu-301.mart-dashboard', key: 'mart', icon: 'icon-grid', link: '/mart/dashboard' },
      {
        name: 'menu.menu-301.settings', link: '', icon: 'icon-settings', key: 'system',
        subMenus: [
          { name: 'menu.menu-301.setting-menu.product', key: 'system', link: '/system/product-manage' },
          { name: 'menu.menu-301.setting-menu.product2', key: 'system', link: '/system/register-package-group-or-account' },
        ],
      },
      {
        name: 'menu.menu-301.user', link: '', icon: 'icon-user', key: 'user',
        subMenus: [
          { name: 'menu.menu-301.user-menu.user-list', key: 'user', link: '/user/list' },
          // { name: 'menu.menu-301.user-menu.user-2', key: 'user', link: '/user/product-manage' },
          // { name: 'menu.menu-301.user-menu.user-3', key: 'user', link: '/user/register-package-group-or-account' },
        ],
      },
      { name: 'menu.menu-301.order', key: 'order', icon: 'icon-basket', link: '/order/list' },
    ]
  }

];