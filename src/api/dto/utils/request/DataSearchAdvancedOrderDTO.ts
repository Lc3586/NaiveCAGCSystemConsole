import { OrderMethod } from './OrderMethod';

/**
 * 高级排序
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DataSearchAdvancedOrderDTO {
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
}
