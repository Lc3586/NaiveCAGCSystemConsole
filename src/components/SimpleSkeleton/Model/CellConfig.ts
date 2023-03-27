import { CellType } from '@/components/SimpleSkeleton/Model/CellType';

/**
 * 单元格信息
 *
 * @author LCTR
 * @date 2022-06-29
 */
export default class CellConfig {
  constructor(width = 12, type: CellType = CellType.文本框) {
    this.width = width;
    this.type = type;
  }

  /**
   * 类型
   *
   * @默认值 CellType.文本框
   */
  type: CellType;

  /**
   * 宽度
   *
   * @默认值 12
   */
  width: number;
}
