import AuthenticationInfo from '@/api/dto/sa/AuthenticationInfo';
import SampleAuthenticationService from '@/api/service/common/SampleAuthenticationService';
import WeChatOAuthService from '@/api/service/common/WeChatOAuthService';
import { mutateState } from '@/utils/Extension';
import { useCookies } from '@vueuse/integrations';
import { Module } from 'vuex';

const { CLIENT_TOKEN_KEY, CLIENT_USER_KEY } = import.meta.env;
const token = useCookies().get(CLIENT_TOKEN_KEY as string) as string;

interface StoreUser {
  token: string;
  user: AnyObject;
}

const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
      token: token,
      user: {} as AuthenticationInfo,
    };
  },
  mutations: {
    mutateState(state, payload) {
      mutateState(state, payload);
    },
  },
  actions: {
    /**
     * 登录
     */
    login(context, payload: AnyObject) {
      WeChatOAuthService.gotoLogin(payload.redirect);
    },
    /**
     * 验证登录
     */
    isAuthorized(context, payload: AnyObject) {
      return new Promise((resolve, reject) => {
        SampleAuthenticationService.isAuthorized()
          .then((user) => {
            if (user == null) {
              reject(new Error('未登录'));
              return;
            }
            context.commit('mutateState', { user });
            useCookies().set(CLIENT_USER_KEY as string, user.key, {
              path: '/',
            });
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 更新token
     */
    updateToken(context, payload: AnyObject) {
      context.commit('mutateState', { token: payload.token });
      useCookies().set(CLIENT_TOKEN_KEY as string, token, {
        path: '/',
      });
    },
    /**
     * 注销登录
     */
    logout() {
      return new Promise((resolve, reject) => {
        SampleAuthenticationService.logout()
          .then((msg) => {
            useCookies().remove(CLIENT_TOKEN_KEY as string, { path: '/' });
            useCookies().remove(CLIENT_USER_KEY as string, { path: '/' });
            window.location.href = '/';
            resolve(msg);
          })
          .catch((error) => {
            window.location.href = '/';
            resolve(error.message);
          });
      });
    },
  },
};

export default store;
