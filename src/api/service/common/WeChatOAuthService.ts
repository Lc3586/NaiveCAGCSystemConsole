/**
 * 微信认证服务
 *
 * @author LCTR
 * @date 2023-03-09
 */
export default class WeChatOAuthService {
  /**
   * 去登录
   *
   * @param {string} returnUrl 登录成功后的回调地址
   */
  public static gotoLogin(returnUrl: string) {
    console.info(returnUrl);
    window.location.href = `${
      import.meta.env.SERVER_API_URL
    }/wechat-oath/goto-login?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  /**
   * 更新微信用户信息
   *
   * @param {string} key 用户标识
   * @param {string} returnUrl 登录成功后的回调地址
   */
  public static updateInfo(key: string, returnUrl: string) {
    window.location.href = `${
      import.meta.env.SERVER_API_URL
    }/wechat-oath/update-info?key=${key}&returnUrl=${encodeURIComponent(
      returnUrl
    )}`;
  }
}
