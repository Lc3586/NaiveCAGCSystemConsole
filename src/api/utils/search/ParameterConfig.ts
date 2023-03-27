import DataSearchFilterDTO from '@/api/dto/utils/request/DataSearchFilterDTO';
import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';

/**
 * 搜索参数配置
 *
 * @author LCTR
 * @date 2023-03-13
 */
export default interface ParameterConfig {
  /**
   * 字段
   */
  field: string;

  /**
   * 比较方式
   */
  filterCompare: FilterCompare;

  /**
   * 值
   */
  value: any;

  /**
   * 获取值
   * 
   * <p>需要自定义处理数据时使用此方法</p>
   */
  resolveValue?: (value: any) => any;

  /**
   * 获取搜索参数
   * 
   * <p>需要自定义处理搜索参数时使用此方法</p>
   */
  resolveFilter?: (config: ParameterConfig) => DataSearchFilterDTO;
}
