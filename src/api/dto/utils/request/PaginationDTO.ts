/**
 * 后端分页设置
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class PaginationDTO {
  /**
   * 不分页
   *
   * @默认值 false
   */
  public nope = false;

  /**
   * 使用PageHelper插件进行分页
   *
   * @默认值 false
   */
  public userPageHelper = false;

  /**
   * 页码
   *
   * @默认值 1
   */
  public pageNum = 1;

  /**
   * 每页数据量
   *
   * @默认值 50
   */
  public pageSize = 10;

  /**
   * 总记录数
   *
   * @原始类型 64位整型
   */
  public recordCount!: string;

  /**
   * 总页数
   *
   * @原始类型 64位整型
   */
  public pageCount!: string;
}
