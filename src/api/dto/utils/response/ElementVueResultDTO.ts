import ElementVueResultDataDTO from './ElementVueResultDataDTO';
import IApiData from './IApiData';

/**
 * ElementVue数据结构方案
 *
 * @param TListItem 数据集合元素类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface ElementVueResultDTO<TListItem>
  extends IApiData<TListItem> {
  /**
   * 成功与否
   */
  success: boolean;

  /**
   * 异常代码
   */
  errorCode: number;

  /**
   * 消息
   */
  message: string;

  /**
   * 数据
   */
  data: ElementVueResultDataDTO<TListItem>;
}
