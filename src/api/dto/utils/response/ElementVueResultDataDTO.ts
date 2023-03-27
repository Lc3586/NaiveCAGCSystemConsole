/**
 * ElementVue数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface ElementVueResultDataDTO<TListItem> {
  /**
   * 总页数
   */
  pageTotal: string;

  /**
   * 总记录数
   */
  total: string;

  /**
   * 当前页码
   */
  pageIndex: number;

  /**
   * 每页数据量
   */
  pageSize: number;

  /**
   * 数据集合
   */
  list: TListItem[];
}
