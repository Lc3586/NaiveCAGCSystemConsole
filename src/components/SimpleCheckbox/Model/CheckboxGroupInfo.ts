import CheckboxGroupParams from '@/components/SimpleCheckbox/Model/CheckboxGroupParams';

/**
 * 多选框分组信息
 *
 * @author LCTR
 * @date 2022-07-01
 */
export default class CheckboxGroupInfo extends CheckboxGroupParams {
  /**
   * 设置
   *
   * @param action 此方法的参数为当前示例
   */
  public setup: (
    action: (model: CheckboxGroupInfo) => void
  ) => CheckboxGroupInfo = (action) => {
    action(this);
    return this;
  };

  /**
   * 全选框状态
   *
   * @默认值 false
   */
  public isIndeterminate = false;
}
