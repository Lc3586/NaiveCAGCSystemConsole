/*
/*\_________________________________________________________________________________________________
|*												说明											     __≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*      此代码由VM模板自动生成																	    |
|*		版本:v0.0.0.1                                                                            |___
|*		日期:2022-07-01 16:31:08                                                                    ≣|
|*																	create by    LCTR              ≣|
|*																	generate by  admin             ≣|
|* ________________________________________________________________________________________________≣|
**/

/**
 * 数据库列业务模型
 * <p>Create</p>
 *
 * @author admin
 * @date 2022-07-01
 */
export class Create {
  /**
   * 所属表
   */
  tableId!: string;

  /**
   * 关联常量/枚举
   */
  cEId?: string;

  /**
   * 列名
   */
  name!: string;

  /**
   * 标题/名称
   */
  title!: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 主键
   */
  pk?: boolean;

  /**
   * 外键
   */
  fk?: boolean;

  /**
   * 外键名称
   */
  fkName?: string;

  /**
   * 外键关联表
   */
  fkTableId?: string;

  /**
   * 外键关联列
   */
  fkColumnId?: string;

  /**
   * 索引
   */
  index?: boolean;

  /**
   * 索引名称
   */
  indexName?: string;

  /**
   * 索引降序
   */
  indexDesc?: boolean;

  /**
   * 唯一键
   */
  unique?: boolean;

  /**
   * 唯一键名称
   */
  uniqueName?: string;

  /**
   * 唯一键降序
   */
  uniqueDesc?: boolean;

  /**
   * 列排序值
   */
  columnSort?: number;

  /**
   * 数据库数据类型
   */
  dbType?: string;

  /**
   * 最大长度
   */
  maxLength?: number;

  /**
   * 精度
   */
  precision?: number;

  /**
   * 标度
   */
  scale?: number;

  /**
   * java字段名
   */
  javaField?: string;

  /**
   * java基本类型
   */
  javaType?: string;

  /**
   * java包装类型
   */
  javaPackageType?: string;

  /**
   * java基本类型强制转换语句
   */
  javaTypeConvert?: string;

  /**
   * java包装类型强制转换语句
   */
  javaPackageTypeConvert?: string;

  /**
   * java反序列化语句
   */
  javaParse?: string;

  /**
   * java序列化语句
   */
  javaStringify?: string;

  /**
   * 必填字段
   */
  required?: boolean;

  /**
   * 搜索字段
   */
  query?: boolean;

  /**
   * 搜索字段比较类型
   */
  queryCompare?: string;

  /**
   * 数据分隔
   */
  split?: boolean;

  /**
   * 数据分隔符号
   */
  splitChar?: string;

  /**
   * 列表功能
   */
  list?: boolean;

  /**
   * 详情功能
   */
  detail?: boolean;

  /**
   * 新增功能
   */
  create?: boolean;

  /**
   * 编辑功能
   */
  edit?: boolean;

  /**
   * 启用/禁用功能
   */
  enable?: boolean;

  /**
   * 锁定/解锁功能
   */
  lock?: boolean;

  /**
   * 树状结构级别列
   */
  treeLevel?: boolean;

  /**
   * 树状结构父id列
   */
  treeParentId?: boolean;

  /**
   * 树状结构根id列
   */
  treeRootId?: boolean;

  /**
   * 导入功能
   */
  import?: boolean;

  /**
   * 导出功能
   */
  export?: boolean;

  /**
   * 其它标签
   */
  tagList?: string[];

  /**
   * 其它选项
   */
  optionList?: string[];

  /**
   * 备注
   */
  remark?: string;

  /**
   * typescript类型
   */
  tsType?: string;
}
