import RuoyiAjaxResultDTO from '@/api/dto/utils/response/RuoyiAjaxResultDTO';

/**
 * Ruoyi框架接口标准返回数据
 *
 * @param TData 数据类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default interface RuoyiAjaxResultDTO_T<TData>
  extends RuoyiAjaxResultDTO {
  /**
   * 数据
   */
  data: TData;
}
