import IApiData from './IApiData';

/**
 * Layui数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface LayuiResultDTO<TListItem> extends IApiData<TListItem> {
  /**
   * 状态码（成功 0，失败 -1）
   */
  code: number;

  /**
   * 信息
   */
  msg: string;

  /**
   * 总记录数
   */
  count: string;

  /**
   * 耗时（毫秒）
   */
  costtime: string;

  /**
   * 数据集合
   */
  rows: TListItem[];
}
