/**
 * 编辑数据
 *
 * @author LCTR
 * @date 2022-06-21
 */
export interface Edit {
  /**
   * Id
   */
  readonly id: string;

  /**
   * 表名
   */
  name: string;

  /**
   * 标题/名称
   */
  title: string;

  /**
   * 所属分组
   */
  group: string;

  /**
   * 署名
   */
  signature: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 业务名称
   */
  businessName: string;

  /**
   * 所属模块
   */
  moduleName: string;

  /**
   * 其它选项
   */
  optionList: string[];

  /**
   * 备注
   */
  remark: string;
}
