/**
 * 数据拖动排序参数
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DragSortDTO<TKey> {
  /**
   * 主键
   */
  public id!: TKey;

  /**
   * 目标主键
   */
  public targetId!: TKey;

  /**
   * 是否排在目标之后
   *
   * @默认值 true
   */
  public append = true;
}
