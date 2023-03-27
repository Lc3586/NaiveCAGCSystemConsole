import IApiData from './IApiData';

/**
 * AntdVue数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface AntdVueResultDTO<TListItem>
  extends IApiData<TListItem> {
  /**
   * 成功与否
   */
  success: boolean;

  /**
   * 消息
   */
  message: string;

  /**
   * 总记录数
   */
  total: string;

  /**
   * 数据集合
   */
  data: TListItem[];
}
