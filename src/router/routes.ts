import Layout from '@/components/Layout/index.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    name: 'Layout',
    path: '/',
    component: Layout,
    meta: {
      keepAlive: true,
    },
    redirect: {
      path: '/index',
    },
    children: [
      {
        name: 'Index',
        path: '/index',
        component: () => import('@/views/index/index.vue'),
      },
      {
        name: 'Table',
        path: '/table',
        component: () => import('@/views/cagc/table/index.vue'),
      },
      {
        name: 'Column',
        path: '/column',
        component: () => import('@/views/cagc/column/index.vue'),
      },
      {
        name: 'ConstEnum',
        path: '/constEnum',
        component: () => import('@/views/cagc/constEnum/index.vue'),
      },
      {
        name: 'ConstEnumData',
        path: '/constEnumData',
        component: () => import('@/views/cagc/constEnumData/index.vue'),
      },
    ],
  },
];

export default routes;
