import { SortMethod } from './SortMethod';

/**
 * 数据排序参数
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DataSortDTO<TKey> {
  constructor(id: TKey, method: SortMethod, span: number) {
    this.id = id;
    this.method = method;
    this.span = span;
  }

  /**
   * 主键
   */
  public id: TKey;

  /**
   * 排序方法（默认值 UP）
   */
  public method: SortMethod = SortMethod.上移;

  /**
   * 跨度（表示移动几位，默认值 1）
   */
  public span = 1;
}
