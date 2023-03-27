/**
 * 多选框值信息
 *
 * @author LCTR
 * @date 2022-07-01
 */
export default class CheckboxValueInfo {
  constructor(name: string, value: any) {
    this.name = name;
    this.value = value;
  }

  /**
   * 名称
   */
  public name: string;

  /**
   * 值
   */
  public value: any;
}
