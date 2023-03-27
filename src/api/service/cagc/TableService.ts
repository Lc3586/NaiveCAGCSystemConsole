import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
import RuoyiAjaxResultDTO_T from '@/api/dto/utils/response/RuoyiAjaxResultDTO_T';
import RuoyiAjaxResultDTO from '@/api/dto/utils/response/RuoyiAjaxResultDTO';
import IApiData from '@/api/dto/utils/response/IApiData';
import { List } from '@/api/dto/cagc/table/List';
import { Edit } from '@/api/dto/cagc/table/Edit';
import { Create } from '@/api/dto/cagc/table/Create';
import { Detail } from '@/api/dto/cagc/table/Detail';
import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';
import { HttpMethod } from '@/api/dto/utils/request/HttpMethod';
import useAxiosApi from '@/utils/UseAxiosApi';
import ApiDataSchemaExtension from '@/api/utils/ApiDataSchemaExtension';

/**
 * 代码自动生成-数据库表服务
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class TableService {
  /**
   * 列表数据
   *
   * @param dataSearch 数据搜索参数
   * @return 数据
   */
  public static async list(dataSearch: DataSearchDTO): Promise<IApiData<List>> {
    return new Promise<IApiData<List>>((resolve, reject) => {
      useAxiosApi('/cagc/table/list', {
        method: HttpMethod.POST,
        data: dataSearch,
      })
        .then((response: any) => {
          resolve(
            ApiDataSchemaExtension.analysisResult(
              response as IApiData<List>,
              dataSearch.schema
            )
          );
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取列表数据失败.'));
        });
    });
  }

  /**
   * 详情数据
   *
   * @param id 主键
   * @return 详情数据
   */
  public static async detail(id: string): Promise<Detail> {
    return new Promise<Detail>((resolve, reject) => {
      useAxiosApi(`/cagc/table/detail/${id}`, {
        method: HttpMethod.GET,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO_T<Detail>).data);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取详情数据失败.'));
        });
    });
  }

  /**
   * 新增
   *
   * @param data 数据
   * @return 操作结果
   */
  public static async create(data: Create): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      useAxiosApi('/cagc/table/create', {
        method: HttpMethod.POST,
        data: data,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO).msg);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('新增失败.'));
        });
    });
  }

  /**
   * 获取编辑数据
   *
   * @param id 主键
   * @return 编辑数据
   */
  public static async getEditData(id: string): Promise<Edit> {
    return new Promise<Edit>((resolve, reject) => {
      useAxiosApi(`/cagc/table/edit/${id}`, {
        method: HttpMethod.GET,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO_T<Edit>).data);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取编辑数据失败.'));
        });
    });
  }

  /**
   * 编辑
   *
   * @param data 数据
   * @return 操作结果
   */
  public static async edit(data: Edit): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      useAxiosApi('/cagc/table/edit', {
        method: HttpMethod.POST,
        data: data,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO).msg);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('编辑失败.'));
        });
    });
  }

  /**
   * 删除
   *
   * @param ids 主键集合
   * @return 操作结果
   */
  public static async delete(ids: string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      useAxiosApi('/cagc/table/delete', {
        method: HttpMethod.POST,
        data: ids,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO).msg);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('删除失败.'));
        });
    });
  }

  /**
   * 获取所有数据库表
   *
   * @return &lt;表名, 注释&gt;
   */
  public static async tableMap(): Promise<Record<string, string>> {
    return new Promise<Record<string, string>>((resolve, reject) => {
      useAxiosApi('/cagc/table/table-map', {
        method: HttpMethod.GET,
      })
        .then((response: any) => {
          resolve(
            (response as RuoyiAjaxResultDTO_T<Record<string, string>>).data
          );
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取所有数据库表失败.'));
        });
    });
  }

  /**
   * 同步
   *
   * @param names 表名集合
   * @return 操作结果
   */
  public static async sync(names: string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      useAxiosApi('/cagc/table/sync', {
        method: HttpMethod.POST,
        data: names,
      })
        .then((response: any) => {
          resolve((response as RuoyiAjaxResultDTO).msg);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('同步失败.'));
        });
    });
  }

  /**
   * 获取已同步的数据库表下拉选择框选项集合
   *
   * @return 选项集合
   */
  public static async synchronizedTableSelectOptionList(): Promise<
    SelectOptionDTO<string>[]
  > {
    return new Promise<SelectOptionDTO<string>[]>((resolve, reject) => {
      useAxiosApi('/cagc/table/synchronized-select-option-list', {
        method: HttpMethod.GET,
      })
        .then((response: any) => {
          resolve(
            (response as RuoyiAjaxResultDTO_T<SelectOptionDTO<string>[]>).data
          );
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取已同步的数据库表下拉选择框选项集合失败.'));
        });
    });
  }
}
