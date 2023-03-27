/**
 * 列配置
 *
 * @author LCTR
 * @date 2023-03-10
 */
export default interface ColumnConfig {
  /**
   * 标题
   */
  label: string;

  /**
   * 属性
   */
  prop: string;

  /**
   * 是否为标识列（主键）
   */
  isKey: boolean;

  /**
   * 列宽
   */
  width?: number;

  /**
   * 列是否固定在左侧或者右侧
   */
  fixed?: string;

  /**
   * 排序
   */
  sortable?: boolean;

  /**
   * 布尔值转为图标
   */
  bool2Icon?: boolean;

  /**
   * 启用图像预览
   */
  enableImagePreview?: boolean;

  /**
   * 获取图像预览地址
   *
   * @param {any} row 当前行数据
   * @param {ColumnConfig} columnConfig 当前行配置
   */
  resolveImagePreviewSrc?: (row: any, columnConfig: ColumnConfig) => string[];

  /**
   * 日期格式化字符串
   */
  dateFormate?: string;

  /**
   * 启用枚举
   */
  enableEnum?: boolean;

  /**
   * 获取枚举集合
   *
   * @param {any} row 当前行数据
   * @param {ColumnConfig} columnConfig 当前行配置
   */
  resolveEnums?: (
    row: any,
    columnConfig: ColumnConfig
  ) => Record<any, string>[];

  /**
   * 以标签形式显示
   */
  enableTags?: boolean;

  /**
   * 获取标签集合
   *
   * @param {any} row 当前行数据
   * @param {ColumnConfig} columnConfig 当前行配置
   */
  resolveTags?: (row: any, columnConfig: ColumnConfig) => string[];
}
