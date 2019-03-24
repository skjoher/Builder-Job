import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * Iview - admin meta in addition to the primary parameters configurable parameters:
 * meta: {
 *  title: { String|Number|Function }
 *  Displayed in the sidebar, bread crumbs, and tabs
 *  use '{{multi-language fields}}' combination of language use, language examples to see many of the routing configuration;
 *  can pass in a callback function, the parameter is the current route objects, example the dynamic routing and belt and routing
 *  hideInBread: (false) Set to true after this stage routing will not appear in the bread crumbs, routing configuration example look at QQ group
 *  hideInMenu: (false) Set to true after on the left side menu options will not display the page
 *  notCache: (false) Set to true after page after switching between won't cache, if you need to cache, without setting this field, but also need to set the page component name property and the name of the routing configuration
 *  access: (null) The page can access an array, the current routing setting permissions will affect zi lu by
 *  icon: (-) The page on the left side menu, bread crumbs, and label the navigation display icon, if it is a custom icon, need to be underlined in front of the name of the icon '_'
 *  beforeCloseName: (-) Set up the field, when closing the current TAB page to '@ / router/before - close. Js' for the field name corresponding method, before the close of the as a hook function
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
    {
    path: '/wip',
    name: 'wip',
    meta: {
      title: 'WIP',
      notCache: true,
      icon: 'md-hand'
    },
    component: () => import('@/view/error-page/wip.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'HomePage',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/page0/page0.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: 'Massage Center'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/pricing',
    name: 'pricing',
    meta: {
      icon: 'md-cash',
      title: 'Data Price'
    },
    component: Main,
    children: [
      {
        path: 'price_list',
        name: 'Price List',
        meta: {
          icon: 'logo-usd',
          title: 'Price List'
        },
        component: () => import('@/view/pricing/priceList.vue')
      },
      {
        path: 'recipes',
        name: 'Recipes',
        meta: {
          icon: 'md-list',
          title: 'Recipes'
        },
        component: () => import('@/view/pricing/pricing.vue')
      },
      {
        path: 'cordell_subscription',
        name: 'recCordell subscriptionipes',
        meta: {
          icon: 'md-pricetags',
          title: 'Cordell Subscription'
        },
        component: () => import('@/view/page2/page2.vue')
      }
    ]
  },

  {
    path: '/contacts',
    name: 'contacts',
    meta: {
      icon: 'md-people',
      title: 'Contacts List'
    },
    component: Main,
    children: [
      {
        path: 'contacts',
        name: 'All',
        meta: {
          icon: 'ios-people',
          title: 'All Contacts'
        },
        component: () => import('@/view/contacts/list.vue')
      },
      {
        path: 'page',
        name: 'page',
        meta: {
          icon: 'md-list',
          title: 'page'
        },
        component: () => import('@/view/page1/page1.vue')
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Main,
    meta: {
      icon: 'md-happy',
      title: 'My Account'
    },
    children: [
      {
        path: 'details',
        name: 'details',
        meta: {
          icon: 'md-finger-print',
          title: 'Account Details'
        },
        component: () => import('@/view/account/details.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          icon: 'ios-man',
          title: 'User List'
        },
        component: () => import('@/view/account/users.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
//   {
//     path: '/500',
//     name: 'error_500',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/500.vue')
//   },
//   {
//     path: '*',
//     name: 'error_404',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/404.vue')
//   }
]
