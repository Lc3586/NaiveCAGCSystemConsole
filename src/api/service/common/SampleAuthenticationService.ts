import AuthenticationInfo from '@/api/dto/sa/AuthenticationInfo';
import { HttpMethod } from '@/api/dto/utils/request/HttpMethod';
import useAxiosApi from '@/utils/UseAxiosApi';

/**
 * 身份验证服务
 *
 * @author LCTR
 * @date 2023-03-09
 */
export default class SampleAuthenticationService {
  /**
   * 验证是否已登录
   *
   * @return 如果已登录则返回身份验证信息，否则返回null
   */
  public static async isAuthorized(): Promise<AuthenticationInfo | null> {
    return new Promise<AuthenticationInfo | null>((resolve, reject) => {
      useAxiosApi('/sa/is-authorized', {
        method: HttpMethod.GET,
      })
        .then((response: AuthenticationInfo) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          resolve(null);
        });
    });
  }

  /**
   * 注销
   */
  public static async logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      useAxiosApi('/sa/logout', {
        method: HttpMethod.GET,
      })
        .then((data) => {
          resolve(data.msg);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('注销失败.'));
        });
    });
  }
}
