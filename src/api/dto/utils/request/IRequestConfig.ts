/**
 * 请求的配置
 *
 * @author LCTR
 * @date 2022-10-12
 */
export interface IRequestConfig {
  /**
   * 标识
   */
  key: symbol;

  /**
   * 时间
   *
   * @默认值 请求开始时的时间
   */
  date: Date;

  /**
   * 请求结束时是否弹窗提示
   *
   * @默认值 false
   */
  alert: boolean;

  /**
   * 请求失败时是否弹窗提示
   *
   * @默认值 true
   */
  alertError: boolean;

  /**
   * 是否允许在上一个请求还未结束时立即开始下一个请求
   *
   * @默认值 false
   */
  repeat: boolean;

  /**
   * 允许重复请求时，每个请求之前的最小时间间隔
   * 单位毫秒（ms）
   *
   * @默认值 1000
   */
  repeatInterval: number;
}
