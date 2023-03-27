/**
 * 身份验证方法
 *
 * @author LCTR
 * @date 2023-03-09
 */
export const enum AuthMethod {
  /**
   * 跨域身份验证票据
   */
  JWT = 'JWT',
  /**
   * session票据
   */
  Cookie = 'Cookie',
}
