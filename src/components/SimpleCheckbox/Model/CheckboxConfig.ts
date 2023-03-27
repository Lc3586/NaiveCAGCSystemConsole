import { CheckboxGroupContainerType } from '@/components/SimpleCheckbox/Model/CheckboxGroupContainerType';
import CheckboxGroupParams from '@/components/SimpleCheckbox/Model/CheckboxGroupParams';

/**
 * 多选框配置
 *
 * @author LCTR
 * @date 2022-07-01
 */
export default class CheckboxConfig {
  /**
   * 设置
   *
   * @param action 此方法的参数为当前示例
   */
  public readonly setup: (
    action: (model: CheckboxConfig) => void
  ) => CheckboxConfig = (action) => {
    action(this);
    return this;
  };

  /**
   * 分组信息集合
   */
  public groups: CheckboxGroupParams[] = [];

  /**
   * 多选框组容器类型
   *
   * @默认值 CheckboxGroupContainerType.Form表单项
   */
  public containerType: CheckboxGroupContainerType =
    CheckboxGroupContainerType.Form表单项;

  /**
   * 使用分割线
   *
   * @默认值 true
   */
  public useDivider = true;

  /**
   * 分割线样式
   *
   * @默认值 solid
   * @参阅 https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style
   * @注意 此配置只在useDivider为true时有效
   */
  public dividerStyle = 'solid';
}
