import useAxiosApi from '@/utils/UseAxiosApi';
import RuoyiAjaxResultDTO_T from '@/api/dto/utils/response/RuoyiAjaxResultDTO_T';
import { useCookies } from '@vueuse/integrations/useCookies';
import { GenerateType } from '@/api/dto/cagc/GenerateType';

/**
 * 代码自动生成服务
 *
 * @author LCTR
 * @date 2022-06-28
 */
export default class CagcService {
  /**
   * 预览代码
   *
   * @param tableId     数据库表Id
   * @param packageName 包名（默认值 com.ruoyi）
   * @param generateTypes 生成类型集合
   * @return codes &lt;生成类型, &lt;条目, 内容&gt;&gt;
   */
  public static async previewCode(
    tableId: string,
    packageName?: string,
    generateTypes: GenerateType[] = []
  ): Promise<Record<string, Record<string, string>>> {
    return new Promise<Record<string, Record<string, string>>>(
      (resolve, reject) => {
        useAxiosApi(
          `/cagc/preview-code/${tableId}?packageName=${
            packageName ?? ''
          }&${generateTypes
            .map(
              (generateType: GenerateType) => `generateTypes=${generateType}`
            )
            .join('&')}`,
          {
            method: 'get',
          }
        )
          .then((response: any) => {
            resolve(
              (
                response as RuoyiAjaxResultDTO_T<
                  Record<string, Record<string, string>>
                >
              ).data
            );
          })
          .catch((error) => {
            console.error(error);
            reject(new Error('获取预览代码失败.'));
          });
      }
    );
  }

  /**
   * 下载代码
   *
   * @param tableIds    数据库表Id集合
   * @param packageName 包名（默认值 com.ruoyi）
   * @param generateTypes 生成类型集合
   */
  public static downloadCode(
    tableIds: string[],
    packageName?: string,
    generateTypes: GenerateType[] = []
  ): void {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = `${import.meta.env.VITE_APP_BASE_URL}/cagc/download-code?${tableIds
      .map((tableId: string) => `tableIds=${tableId}`)
      .join('&')}&packageName=${packageName ?? ''}&${generateTypes
      .map((generateType: string) => `generateTypes=${generateType}`)
      .join('&')}&jwt-token=${useCookies().get(
      import.meta.env.CLIENT_TOKEN as string
    )}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
