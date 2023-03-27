import DragSortDTO from './DragSortDTO';

/**
 * 树状数据拖动排序参数
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class TreeDragSortDTO<TKey> extends DragSortDTO<TKey> {
  /**
   * 是否移至目标内部（默认值 false）
   *
   * @默认值 false
   */
  public inside = false;
}
