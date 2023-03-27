import CheckboxValueInfo from '@/components/SimpleCheckbox/Model/CheckboxValueInfo';

/**
 * 多选框分组参数
 *
 * @author LCTR
 * @date 2022-07-01
 */
export default class CheckboxGroupParams {
  /**
   * 设置
   *
   * @param action 此方法的参数为当前示例
   */
  public setup: (
    action: (model: CheckboxGroupParams) => void
  ) => CheckboxGroupParams = (action) => {
    action(this);
    return this;
  };

  /**
   * 名称
   */
  public name!: string;

  /**
   * 所有值
   *
   * @注意 此值为对象，
   */
  public allValues: CheckboxValueInfo[] = [];

  /**
   * 选中值集合
   */
  public selectedValues: any[] = [];

  /**
   * 全选状态
   *
   * @注意 此值优先级低于selectedValues
   * @默认值 true
   */
  public checkAll = true;
}
