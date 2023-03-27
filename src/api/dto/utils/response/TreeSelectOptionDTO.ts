import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';
import { SelectOptionType } from './SelectOptionType';

/**
 * 树状选择器选项
 *
 * @author LCTR
 * @date 2022-07-07
 */
export default class TreeSelectOptionDTO<TDetail>
  implements SelectOptionDTO<TDetail>
{
  /**
   * 显示文本
   */
  public text!: string;

  /**
   * 值
   */
  public value!: any;

  /**
   * 选项类型
   */
  public type!: SelectOptionType;

  /**
   * 详情数据
   */
  public detail!: TDetail;

  /**
   * 是否拥有子级
   */
  public get hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * 子级数量
   */
  public get childrenCount(): number {
    return this.children.length;
  }

  /**
   * 子级
   */
  public readonly children: TreeSelectOptionDTO<TDetail>[] = [];
}
