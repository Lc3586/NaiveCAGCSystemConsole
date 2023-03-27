import IApiData from './IApiData';

/**
 * Easyui、BootstrapTable数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface EasyuiResultDTO<TListItem>
  extends IApiData<TListItem> {
  /**
   * 总页数
   */
  total: string;

  /**
   * 当前页码
   */
  currentPage: number;

  /**
   * 每页数据量
   */
  pageSize: number;

  /**
   * 耗时（毫秒）
   */
  costtime: string;

  /**
   * 数据集合
   */
  rows: TListItem[];
}
