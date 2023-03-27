import { SelectOptionType } from './SelectOptionType';

/**
 * 选择器选项
 *
 * @author LCTR
 * @date 2022-07-04
 */
export default interface SelectOptionDTO<TDetail> {
  /**
   * 显示文本
   */
  text: string;

  /**
   * 值
   */
  value: any;

  /**
   * 选项类型
   */
  type?: SelectOptionType;

  /**
   * 详情数据
   */
  detail?: TDetail;
}
