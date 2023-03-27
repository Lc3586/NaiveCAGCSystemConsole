/**
 * 生成类型
 *
 * @author admin
 * @date 2022-07-01
 */
export const enum GenerateType {
  实体类 = 'Entity',
  实体字段集合 = 'EntityFields',
  业务模型 = 'DTO',
  常量_枚举 = 'Const_Enum',
  服务接口类 = 'Service',
  服务实现类 = 'ServiceImpl',
  控制器 = 'Controller',
  TS模型字段集合 = 'TS_ModelFields',
  TS业务模型 = 'TS_DTO',
  TS接口服务 = 'TS_Service',
  TS常量_枚举 = 'TS_Const_Enum',
  Vue管理页 = 'VUE_Index',
  Vue详情页 = 'VUE_Detail',
  Vue新增页 = 'VUE_Add',
  Vue编辑页 = 'VUE_Edit',
  添加菜单的Sql语句 = 'SQL_Menu',
}

/**
 * Java相关的生成类型
 */
export const JavaGenerateTypes = {
  实体类: GenerateType.实体类,
  实体字段集合: GenerateType.实体字段集合,
  业务模型: GenerateType.业务模型,
  常量_枚举: GenerateType.常量_枚举,
  服务接口类: GenerateType.服务接口类,
  服务实现类: GenerateType.服务实现类,
  控制器: GenerateType.控制器,
} as Record<string, GenerateType>;

/**
 * TS相关的生成类型
 */
export const TSGenerateTypes = {
  TS模型字段集合: GenerateType.TS模型字段集合,
  TS业务模型: GenerateType.TS业务模型,
  TS常量_枚举: GenerateType.TS常量_枚举,
  TS接口服务: GenerateType.TS接口服务,
} as Record<string, GenerateType>;

/**
 * Vue相关的生成类型
 */
export const VueGenerateTypes = {
  Vue管理页: GenerateType.Vue管理页,
  Vue详情页: GenerateType.Vue详情页,
  Vue新增页: GenerateType.Vue新增页,
  Vue编辑页: GenerateType.Vue编辑页,
} as Record<string, GenerateType>;

/**
 * 其他相关的生成类型
 */
export const OtherGenerateTypes = {
  添加菜单的Sql语句: GenerateType.添加菜单的Sql语句,
} as Record<string, GenerateType>;

/**
 * 全部生成类型
 */
export const AllGenerateTypes = Object.assign(
  JSON.parse(JSON.stringify(JavaGenerateTypes)),
  JSON.parse(JSON.stringify(TSGenerateTypes)),
  JSON.parse(JSON.stringify(VueGenerateTypes)),
  JSON.parse(JSON.stringify(OtherGenerateTypes))
);
