import store from '@/store';
import { useTitle } from '@vueuse/core';
import { useCookies } from '@vueuse/integrations/useCookies';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
} from 'vue-router';
import routes from './routes';

const { VITE_TITLE, CLIENT_TOKEN_KEY, CLIENT_USER_KEY } = import.meta.env;
// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  savedPosition: Record<string, any> | null
) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    const position: Record<string, any> = {};

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.el = to.hash;
      position.behavior = 'smooth';

      if (to.name == 'Item') {
        position.top = 200;
      }

      if (/^#\w/.test(to.hash) || document.querySelector(to.hash)) {
        return position;
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false;
    }

    return new Promise((resolve) => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some((m) => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.left = 0;
        position.top = 0;
      }

      resolve(position);
    });
  }
};

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior,
});

//白名单
const whiteList: Array<string> = ['Home', 'Login'];

router.beforeEach(async (to, from, next) => {
  // set title
  useTitle((to.meta?.title as string) || (VITE_TITLE as string));

  // determine whether the user has logged in
  const hasToken = useCookies().get(CLIENT_TOKEN_KEY as string);
  if (hasToken) {
    //如果已经登录后再访问登录页，则会重定向首页
    to.name == 'Login' ? next('/') : null;

    const hasKey = store.state.user?.key;
    if (!hasKey) {
      // 如果已登录但是没有用户信息则获取用户信息
      try {
        await store.dispatch('user/isAuthorized');
      } catch (error) {
        // 获取用户信息失败，则注销并重新登录
        await store.dispatch('user/logout');
      }
    }
    next();
  } else {
    if (whiteList.indexOf(to.name as string) != -1) {
      //访问白名单下的路由地址不需要token
      next();
    } else {
      //去登陆
      next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }

  next();
});

export function routerPush(to: RouteLocationRaw) {
  router.push(to);
}

export function routerReplace(to: RouteLocationRaw) {
  router.replace(to);
}

export function routerBack() {
  router.back();
}

export function routerForward() {
  router.forward();
}

export function routerGo(delta: number) {
  router.go(delta);
}

export default router;
