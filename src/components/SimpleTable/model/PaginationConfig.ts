/**
 * 分页配置
 *
 * @author LCTR
 * @date 2023-03-10
 */
export default interface PaginationConfig {
  /**
   * 页码
   *
   * @默认值 1
   */
  pageIndex: number;

  /**
   * 每页数据量
   *
   * @默认值 50
   */
  pageSize: number;

  /**
   * 页面数据量选项
   *
   * @默认值 [5, 10, 15, 20, 50, 100, 150, 200]
   */
  sizes: number[];
}
