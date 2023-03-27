import IApiData from './IApiData';

/**
 * JqGrid数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface JqGridResultDTO<TListItem>
  extends IApiData<TListItem> {
  /**
   * 总页数
   */
  total: string;

  /**
   * 当前页码
   */
  page: number;

  /**
   * 总记录数
   */
  records: string;

  /**
   * 耗时（毫秒）
   */
  costtime: string;

  /**
   * 数据集合
   */
  rows: TListItem[];
}
