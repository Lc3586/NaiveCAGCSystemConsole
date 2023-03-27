/**
 * 列表数据
 *
 * @author LCTR
 * @date 2022-06-21
 */
export interface List {
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
   * 业务名称
   */
  businessName: string;

  /**
   * 所属模块
   */
  moduleName: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 列数量
   */
  columnCount: number;
}
