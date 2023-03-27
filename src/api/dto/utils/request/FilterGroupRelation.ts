/**
 * 动态过滤条件分组关系类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export const enum FilterGroupRelation {
  /**
   * 并且
   *
   * @类似于 1 && 2
   */
  并且 = 'AND',
  /**
   * 或
   *
   * @类似于 1 || 2
   */
  或 = 'OR',
}
