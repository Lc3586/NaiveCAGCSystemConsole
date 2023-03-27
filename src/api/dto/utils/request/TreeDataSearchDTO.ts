import DataSearchDTO from './DataSearchDTO';

/**
 * 后端树状数据搜索参数
 *
 * @author LCTR
 * @date 2022-06-21
 */
export default class TreeDataSearchDTO extends DataSearchDTO {
  /**
   * 父Id
   */
  public parentId?: string;

  /**
   * 获取所有层级的数据
   *
   * @默认值 true
   */
  public allLevel = true;

  /**
   * 获取指定层级数的数据
   * <p>从parentId对应的数据开始计算层级</p>
   * <p>此值为2，则代表只向下获取2层数据</p>
   */
  public rank?: number;
}
