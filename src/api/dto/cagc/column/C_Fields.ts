/*
/*\_________________________________________________________________________________________________
|*												说明											     __≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*      此代码由VM模板自动生成																	    |
|*		版本:v0.0.0.1                                                                            |___
|*		日期:2022-07-01 16:31:07                                                                    ≣|
|*																	create by    LCTR              ≣|
|*																	generate by  admin             ≣|
|* ________________________________________________________________________________________________≣|
**/

/**
 * 数据库列模型字段集合
 *
 * @author admin
 * @date 2022-07-01
 */
export const enum C_Fields {
  /**
   * Id
   */
  id = 'id',

  /**
   * 所属表
   */
  tableId = 'tableId',

  /**
   * 所属表
   */
  tableName = 'tableName',

  /**
   * 关联常量/枚举
   */
  cEId = 'cEId',

  /**
   * 关联常量/枚举
   */
  cEName = 'cEName',

  /**
   * 列名
   */
  name = 'name',

  /**
   * 标题/名称
   */
  title = 'title',

  /**
   * 描述
   */
  description = 'description',

  /**
   * 主键
   */
  pk = 'pk',

  /**
   * 外键
   */
  fk = 'fk',

  /**
   * 外键名称
   */
  fkName = 'fkName',

  /**
   * 外键关联表
   */
  fkTableId = 'fkTableId',

  /**
   * 外键关联列
   */
  fkColumnId = 'fkColumnId',

  /**
   * 索引
   */
  index = 'index',

  /**
   * 索引名称
   */
  indexName = 'indexName',

  /**
   * 索引降序
   */
  indexDesc = 'indexDesc',

  /**
   * 唯一键
   */
  unique = 'unique',

  /**
   * 唯一键名称
   */
  uniqueName = 'uniqueName',

  /**
   * 唯一键降序
   */
  uniqueDesc = 'uniqueDesc',

  /**
   * 列排序值
   */
  columnSort = 'columnSort',

  /**
   * 数据库数据类型
   */
  dbType = 'dbType',

  /**
   * 最大长度
   */
  maxLength = 'maxLength',

  /**
   * 精度
   */
  precision = 'precision',

  /**
   * 标度
   */
  scale = 'scale',

  /**
   * java字段名
   */
  javaField = 'javaField',

  /**
   * java基本类型
   */
  javaType = 'javaType',

  /**
   * java包装类型
   */
  javaPackageType = 'javaPackageType',

  /**
   * java基本类型强制转换语句
   */
  javaTypeConvert = 'javaTypeConvert',

  /**
   * java包装类型强制转换语句
   */
  javaPackageTypeConvert = 'javaPackageTypeConvert',

  /**
   * java反序列化语句
   */
  javaParse = 'javaParse',

  /**
   * java序列化语句
   */
  javaStringify = 'javaStringify',

  /**
   * 必填字段
   */
  required = 'required',

  /**
   * 搜索字段
   */
  query = 'query',

  /**
   * 搜索字段比较类型
   */
  queryCompare = 'queryCompare',

  /**
   * 数据分隔
   */
  split = 'split',

  /**
   * 数据分隔符号
   */
  splitChar = 'splitChar',

  /**
   * 列表功能
   */
  list = 'list',

  /**
   * 详情功能
   */
  detail = 'detail',

  /**
   * 新增功能
   */
  create = 'create',

  /**
   * 编辑功能
   */
  edit = 'edit',

  /**
   * 启用/禁用功能
   */
  enable = 'enable',

  /**
   * 锁定/解锁功能
   */
  lock = 'lock',

  /**
   * 排序功能
   */
  sort = 'sort',

  /**
   * 树状结构级别列
   */
  treeLevel = 'treeLevel',

  /**
   * 树状结构父id列
   */
  treeParentId = 'treeParentId',

  /**
   * 树状结构根id列
   */
  treeRootId = 'treeRootId',

  /**
   * 导入功能
   */
  import_ = 'import_',

  /**
   * 导出功能
   */
  export = 'export',

  /**
   * 其它标签（[,]号拼接）
   */
  tags = 'tags',

  /**
   * 其它标签
   */
  tagList = 'tagList',

  /**
   * 其它选项（[,]号拼接）
   */
  options = 'options',

  /**
   * 其它选项
   */
  optionList = 'optionList',

  /**
   * 备注
   */
  remark = 'remark',

  /**
   * 创建者
   */
  createBy = 'createBy',

  /**
   * 创建时间
   */
  createTime = 'createTime',

  /**
   * 更新者
   */
  updateBy = 'updateBy',

  /**
   * 更新时间
   */
  updateTime = 'updateTime',

  /**
   * typescript类型
   */
  tsType = 'tsType',
}
