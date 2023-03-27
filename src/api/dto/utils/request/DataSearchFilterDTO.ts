import { FilterCompare } from './FilterCompare';
import { FilterGroupRelation } from './FilterGroupRelation';

/**
 * 后端数据搜索条件
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DataSearchFilterDTO {
  constructor();
  constructor(field: string, compare: FilterCompare, value: any);
  constructor(
    field?: string,
    compare?: FilterCompare,
    value?: any,
    tableKey?: string
  ) {
    if (field != null) this.field = field;
    if (compare != null) this.compare = compare;
    if (value != null) this.value = value;
    if (tableKey != null) this.tableKey = tableKey;
  }

  /**
   * 数据表标识
   */
  public tableKey?: string;

  /**
   * 要比较的字段
   */
  public field!: string;

  /**
   * 用于比较的值
   */
  public value!: any;

  /**
   * Value值是用来比较的字段
   *
   * @默认值 false
   */
  public valueIsField = false;

  /**
   * 比较类型
   *
   * @默认值 FilterCompare.相等
   */
  public compare: FilterCompare = FilterCompare.相等;

  /**
   * 组内关系
   *
   * @默认值 FilterGroupRelation.并且
   */
  public relation: FilterGroupRelation = FilterGroupRelation.并且;

  /**
   * 子条件
   */
  public filters: DataSearchFilterDTO[] = [];
}
