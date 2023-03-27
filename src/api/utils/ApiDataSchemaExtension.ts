import { ApiDataSchema } from '../dto/utils/request/ApiDataSchema';
import AntdVueResultDTO from '../dto/utils/response/AntdVueResultDTO';
import EasyuiResultDTO from '../dto/utils/response/EasyuiResultDTO';
import ElementVueResultDTO from '../dto/utils/response/ElementVueResultDTO';
import IApiData from '../dto/utils/response/IApiData';
import JqGridResultDTO from '../dto/utils/response/JqGridResultDTO';
import LayuiResultDTO from '../dto/utils/response/LayuiResultDTO';
import RuoyiResultDTO from '../dto/utils/response/RuoyiResultDTO';

/**
 * 后端接口数据结构方案扩展方法
 *
 * @author LCTR
 * @date 2022-06-27
 */
export default class ApiDataSchemaExtension {
  /**
   * 分析返回数据
   *
   * @param result 返回数据
   * @param schema 后端接口数据结构方案
   * @return 具体类型的返回数据
   */
  public static analysisResult<TListItem>(
    result: IApiData<TListItem>,
    schema: ApiDataSchema
  ): IApiData<TListItem> {
    switch (schema) {
      default:
      case ApiDataSchema.默认:
      case ApiDataSchema.Ruoyi:
        return result as RuoyiResultDTO<TListItem>;
      case ApiDataSchema.Layui:
        return result as LayuiResultDTO<TListItem>;
      case ApiDataSchema.JqGrid:
        return result as JqGridResultDTO<TListItem>;
      case ApiDataSchema.Easyui:
      case ApiDataSchema.BootstrapTable:
        return result as EasyuiResultDTO<TListItem>;
      case ApiDataSchema.AntdVue:
        return result as AntdVueResultDTO<TListItem>;
      case ApiDataSchema.ElementVue:
        return result as ElementVueResultDTO<TListItem>;
    }
  }
}
