/**
 * 弹窗的参数
 *
 * @author LCTR
 * @date 2022-06-28
 */
export default class DialogParam {
  constructor();
  constructor(title?: string, type?: string, visible = false) {
    if (title) this.title = title;
    if (type) this.type = type;
    this.visible = visible;
  }

  /**
   * 标题
   */
  title!: string;

  /**
   * 类型
   */
  type!: string;

  /**
   * 是否可见
   */
  visible: boolean;

  /**
   * 宽度
   */
  width = '30%';

  /**
   * 显示提交按钮
   */
  showConfirmeBtn = true;

  /**
   * 显示关闭按钮
   */
  showCloseBtn = true;
}
