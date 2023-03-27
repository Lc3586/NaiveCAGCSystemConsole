import DataSearchAdvancedOrderDTO from './DataSearchAdvancedOrderDTO';
import { OrderMethod } from './OrderMethod';

/**
 * 后端数据排序条件
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DataSearchOrderDTO {
  constructor();
  constructor(field: string, method: OrderMethod);
  constructor(
    field?: string,
    method?: OrderMethod,
    tableKey?: string,
    advancedOrder?: DataSearchAdvancedOrderDTO[]
  ) {
    if (tableKey != null) this.tableKey = tableKey;
    if (field != null) this.field = field;
    if (method != null) this.method = method;
    if (advancedOrder != null) this.advancedOrder = advancedOrder;
  }

  /**
   * 数据表标识
   */
  public tableKey?: string;

  /**
   * 排序字段
   */
  public field!: string;

  /**
   * 排序方法
   *
   * @默认值 OrderMethod.降序
   */
  public method: OrderMethod = OrderMethod.降序;

  /**
   * 高级排序
   */
  public advancedOrder: DataSearchAdvancedOrderDTO[] = [];
}
