import { ApiDataSchema } from './ApiDataSchema';
import DataSearchFilterDTO from './DataSearchFilterDTO';
import DataSearchOrderDTO from './DataSearchOrderDTO';
import PaginationDTO from './PaginationDTO';

/**
 * 后端数据搜索参数
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class DataSearchDTO {
  /**
   * 数据结构方案（默认值 Default，也就是偌依框架的数据结果）
   *
   * @默认值 ApiDataSchema.默认
   */
  public schema: ApiDataSchema = ApiDataSchema.默认;

  /**
   * 分页设置（默认设置 进行分页，每页50条数据）
   */
  public pagination: PaginationDTO = new PaginationDTO();

  /**
   * 搜索条件
   */
  public filters: DataSearchFilterDTO[] = [];

  /**
   * 自定义参数
   */
  public customParameter: Record<string, any> = {};

  /**
   * 排序条件
   */
  public order: DataSearchOrderDTO = new DataSearchOrderDTO();
}
