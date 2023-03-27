/**
 * 详情数据
 *
 * @author LCTR
 * @date 2022-06-21
 */
export interface Detail {
  /**
   * Id
   */
  id: string;

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
   * 列数量
   */
  columnCount: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 创建者
   */
  createBy: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新者
   */
  updateBy: string;

  /**
   * 更新时间
   */
  updateTime: Date;
}
