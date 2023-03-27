/**
 * 组件开放接口
 *
 * @author LCTR
 * @date 2023-03-13
 */
export interface IOpenApi {
  /**
   * 重新加载
   */
  reload(): Promise<void>;
}
