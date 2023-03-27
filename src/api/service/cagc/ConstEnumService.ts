/*
/*\_________________________________________________________________________________________________
|*												说明											     __≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*      此代码由VM模板自动生成																	    |
|*		版本:v0.0.0.1                                                                            |___
|*		日期:2022-07-04 17:00:49                                                                    ≣|
|*																	create by    LCTR              ≣|
|*																	generate by  admin             ≣|
|* ________________________________________________________________________________________________≣|
**/

import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
import RuoyiAjaxResultDTO_T from '@/api/dto/utils/response/RuoyiAjaxResultDTO_T';
import RuoyiAjaxResultDTO from '@/api/dto/utils/response/RuoyiAjaxResultDTO';
import IApiData from '@/api/dto/utils/response/IApiData';
import { List } from '@/api/dto/cagc/constEnum/List';
import { Edit } from '@/api/dto/cagc/constEnum/Edit';
import { Create } from '@/api/dto/cagc/constEnum/Create';
import { Detail } from '@/api/dto/cagc/constEnum/Detail';
import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';
import useAxiosApi from '@/utils/UseAxiosApi';
import ApiDataSchemaExtension from '@/api/utils/ApiDataSchemaExtension';
import { HttpMethod } from '@/api/dto/utils/request/HttpMethod';

/**
 * 常量/枚举服务
 *
 * @author admin
 * @date 2022-07-04
 */
export default class ConstEnumService {
  /**
   * 列表数据
   *
   * @param dataSearch 数据搜索参数
   * @return 数据
   */
  public static async list(dataSearch: DataSearchDTO): Promise<IApiData<List>> {
    return new Promise<IApiData<List>>((resolve, reject) => {
      useAxiosApi('/cagc/const-enum/list', {
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
      useAxiosApi(`/cagc/const-enum/detail/${id}`, {
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
      useAxiosApi('/cagc/const-enum/create', {
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
      useAxiosApi(`/cagc/const-enum/edit/${id}`, {
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
      useAxiosApi('/cagc/const-enum/edit', {
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
  public static async delete_(ids: string[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      useAxiosApi('/cagc/const-enum/delete', {
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
   * 获取下拉选择框选项集合
   *
   * @return 选项集合
   */
  public static async selectOptionList(): Promise<SelectOptionDTO<string>[]> {
    return new Promise<SelectOptionDTO<string>[]>((resolve, reject) => {
      useAxiosApi('/cagc/const-enum/select-option-list', {
        method: HttpMethod.GET,
      })
        .then((response: any) => {
          resolve(
            (response as RuoyiAjaxResultDTO_T<SelectOptionDTO<string>[]>).data
          );
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('获取下拉选择框选项集合失败.'));
        });
    });
  }
}
