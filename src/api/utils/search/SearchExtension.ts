import DataSearchFilterDTO from '@/api/dto/utils/request/DataSearchFilterDTO';
import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';
import ParameterConfig from './ParameterConfig';

/**
 * 搜索方法扩展工具
 *
 * @author LCTR
 * @date 2023-03-13
 */
export default class SearchExtension {
  /**
   * 获取搜索参数集合
   *
   * @param parameterConfigs 参数配置
   * @param specialConfigs 需要特别处理的搜索参数
   */
  public static getFilters(
    parameterConfigs: Record<string, ParameterConfig>,
    specialConfigs?: Map<
      string,
      (config: ParameterConfig) => DataSearchFilterDTO
    >
  ): DataSearchFilterDTO[] {
    const filters = [] as DataSearchFilterDTO[];

    for (const parameter in parameterConfigs) {
      const parameterConfig = parameterConfigs[parameter];
      if (specialConfigs && specialConfigs.has(parameter)) {
        //获取特殊搜索参数
        const filter = specialConfigs
          .get(parameter)
          ?.call(null, parameterConfig);
        if (filter) filters.push(filter);
      } else {
        if (parameterConfig.resolveFilter) {
          //获取指定搜索参数
          const filter = parameterConfig.resolveFilter(parameterConfig);
          if (filter) filters.push(filter);
          continue;
        }

        //获取值
        const value = parameterConfig.resolveValue
          ? parameterConfig.resolveValue(parameterConfig.value)
          : parameterConfig.value;

        switch (parameterConfig.filterCompare) {
          case FilterCompare.包含:
          case FilterCompare.包含_忽略大小写:
          case FilterCompare.不包含:
          case FilterCompare.不包含_忽略大小写:
          case FilterCompare.前段包含:
          case FilterCompare.前段包含_忽略大小写:
          case FilterCompare.前段不包含:
          case FilterCompare.前段不包含_忽略大小写:
          case FilterCompare.后段包含:
          case FilterCompare.后段包含_忽略大小写:
          case FilterCompare.后段不包含:
          case FilterCompare.后段不包含_忽略大小写:
          case FilterCompare.包含于:
          case FilterCompare.包含于_忽略大小写:
          case FilterCompare.不包含于:
          case FilterCompare.不包含于_忽略大小写:
            if (!value || (value as string).length == 0) continue;
            break;
          case FilterCompare.在集合中:
          case FilterCompare.在集合中_忽略大小写:
          case FilterCompare.不在集合中:
          case FilterCompare.不在集合中_忽略大小写:
          case FilterCompare.范围:
          case FilterCompare.日期范围:
          case FilterCompare.严格模式的日期范围:
            if (!value || (value as unknown[]).length == 0) continue;
            break;
          default:
            if (value) continue;
            break;
        }

        filters.push(
          new DataSearchFilterDTO(
            parameterConfig.field,
            parameterConfig.filterCompare,
            value
          )
        );
      }
    }

    return filters;
  }
}
