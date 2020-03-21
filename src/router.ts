import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import store from './store.ts';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      meta: {
        login: true,
      },
    },
    {
      path: '/categories',
      name: 'categories',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Categories.vue'),
    },
    {
      path: '/accounts/common',
      name: 'accounts',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/accounts/Accounts.vue'),
    },
    {
      path: '/accounts/goal',
      name: 'goalAccounts',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/accounts/GoalAccounts.vue'),
    },
    {
      path: '/accounts/debts',
      name: 'debtsAccounts',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/accounts/DebtAccounts.vue'),
    },
    {
      path: '/operations',
      name: 'operations',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/operations/Operations.vue'),
    },
    {
      path: '/statistics/common',
      name: 'statistics',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/statistics/Statistics.vue'),
    },
    {
      path: '/statistics/categoryTrend',
      name: 'statisticsCategoryTrend',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/statistics/CategoryTrend.vue'),
    },
    {
      path: '/statistics/byYear',
      name: 'statisticByYear',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/statistics/StatisticsByYear.vue'),
    },
    {
      path: '/plans',
      name: 'plans',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/operations/Plans.vue'),
    },
    {
      path: '/params',
      name: 'params',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AppParams.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.login)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});
export default router;
