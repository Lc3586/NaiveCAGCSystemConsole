import store from '@/store';
import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { ElMessage } from 'element-plus';
import { IRequestConfig } from '../api/dto/utils/request/IRequestConfig';
import { HttpStatus } from '@/api/dto/utils/response/HttpStatus';
import { useCookies } from '@vueuse/integrations';

const { CLIENT_TOKEN } = import.meta.env;
const authorizationHeaderKey = 'Authorization';

//设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

// create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.SERVER_API_URL,
  timeout: 5000,
});

/**
 * 每个请求的配置信息
 */
const requestConfigMap = new Map<symbol, IRequestConfig>();

// request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    //设置配置
    const mergeConfig: InternalAxiosRequestConfig<any> & IRequestConfig =
      _.merge(
        {
          key: Symbol(config.url),
          alert: false,
          alertError: true,
          repeat: false,
          repeatInterval: 1000,
          date: new Date(),
        } as IRequestConfig,
        config
      );

    // 是否需要防止数据重复提交
    const isRepeatSubmit = (mergeConfig.headers || {}).repeatSubmit === false;

    //1、不允许重复请求
    if (!isRepeatSubmit && requestConfigMap.has(mergeConfig.key))
      return Promise.reject(new Error('数据正在处理，请勿重复提交'));

    //2、允许重复请求，但请求频率过高
    if (
      mergeConfig.repeat &&
      new Date().getTime() - mergeConfig.date.getTime() <
        mergeConfig.repeatInterval
    )
      return Promise.reject(new Error('数据正在处理，请稍候'));

    requestConfigMap.set(mergeConfig.key, mergeConfig);

    // do something before request is sent
    const token = store.state.token;

    if (token) mergeConfig.headers[authorizationHeaderKey] = token;

    return mergeConfig as InternalAxiosRequestConfig<any>;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    //请求结束
    const config = response.config as AxiosRequestConfig & IRequestConfig;
    //移除请求的配置信息
    requestConfigMap.delete(config.key);

    const code = response.data.code || 200;
    let msg = response.data.msg;

    const res = response.data;
    console.log('输出', res);

    const token = response.headers[authorizationHeaderKey] as string;
    if (token && token != '') {
      //更新token
      store.dispatch('user/updateToken', { token });
    }

    // if the custom code is not 200, it is judged as an error.
    if (code === HttpStatus.未登录 || code === HttpStatus.登录信息已过期) {
      //未登录或登录信息已过期
      store.dispatch('user/userLogout');
      msg = msg || '身份验证信息已过期，请重新登录';
      if (config.alert || config.alertError) ElMessage.warning(msg);
      return Promise.reject(new Error(msg));
    } else if (code === HttpStatus.服务器维护中) {
      //服务器正在维护中
      msg = msg || '系统维护中，请稍后再试';
      if (config.alert || config.alertError) ElMessage.warning(msg);
      return Promise.reject(new Error(msg));
    } else if (code === HttpStatus.服务器错误) {
      //服务器错误
      msg = msg || '系统繁忙，请稍后再试';
      if (config.alert || config.alertError) ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    } else if (code !== HttpStatus.成功) {
      //其他错误
      msg = msg || '网络异常';
      if (config.alert || config.alertError) ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    } else {
      //请求成功
      if (config.alert) ElMessage.success(response.data.msg);
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    //请求失败
    console.error('请求异常' + error);
    let message = error.message;
    if (message == 'Network Error') message = '网络异常';
    else if (message.includes('timeout')) message = '接口请求超时';
    else if (message.includes('Request failed with status code'))
      message = '系统繁忙';

    ElMessage.error(error.message);
    return Promise.reject(error.message);
  }
);

/**
 * 请求接口
 *
 * @param {string} url 接口地址
 * @param {AxiosRequestConfig} config 请求配置
 */
export default function useAxiosApi(
  url: string,
  config: AxiosRequestConfig
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const { data, error } = useAxios(url, config, instance);
    watch(data, () => {
      resolve(data);
    });
    watch(error, () => {
      reject(error);
    });
  });
}
