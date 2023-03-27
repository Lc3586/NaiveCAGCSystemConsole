import IApiData from './IApiData';

/**
 * Ruoyi框架数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface RuoyiResultDTO<TListItem> extends IApiData<TListItem> {
  /**
   * 总记录数
   */
  total: string;

  /**
   * 状态码
   */
  code: number;

  /**
   * 消息
   */
  msg: string;

  /**
   * 数据集合
   */
  rows: TListItem[];
}
