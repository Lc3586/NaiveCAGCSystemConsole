/**
 * 动态过滤条件比较类型
 *
 * @author LCTR
 * @date 2022-06-21
 */
export const enum FilterCompare {
  /**
   * 相等
   *
   * @类似于 id = value
   */
  相等 = 'Eq',
  /**
   * 相等（忽略大小写）
   *
   * @类似于 /^value$/i.test(id)
   */
  相等_忽略大小写 = 'EqIgnoreCase',
  /**
   * 不相等
   *
   * @类似于 id != value
   */
  不相等 = 'NotEq',
  /**
   * 不相等（忽略大小写）
   *
   * @类似于 !/^value$/i.test(id)
   */
  不相等_忽略大小写 = 'NotEq',
  /**
   * 小于等于
   *
   * @类似于 id <= value
   */
  小于等于 = 'Le',
  /**
   * 小于
   *
   * @类似于 id < value
   */
  小于 = 'Lt',
  /**
   * 大于等于
   *
   * @类似于 id >= value
   */
  大于等于 = 'Ge',
  /**
   * 大于
   *
   * @类似于 id > value
   */
  大于 = 'Gt',
  /**
   * 包含
   *
   * @类似于 /^.*value.*$/.test(id)
   */
  包含 = 'In',
  /**
   * 包含（忽略大小写）
   *
   * @类似于 /^.*value.*$/i.test(id)
   */
  包含_忽略大小写 = 'InIgnoreCase',
  /**
   * 不包含
   *
   * @类似于 !/^.*value.*$/.test(id)
   */
  不包含 = 'NotIn',
  /**
   * 不包含（忽略大小写）
   *
   * @类似于 !/^.*value.*$/i.test(id)
   */
  不包含_忽略大小写 = 'NotInIgnoreCase',
  /**
   * 前段包含
   *
   * @类似于 /^value.*$/.test(id)
   */
  前段包含 = 'InStart',
  /**
   * 前段包含（忽略大小写）
   *
   * @类似于 /^value.*$/i.test(id)
   */
  前段包含_忽略大小写 = 'InStartIgnoreCase',
  /**
   * 前段不包含
   *
   * @类似于 !/^value.*$/.test(id)
   */
  前段不包含 = 'NotInStart',
  /**
   * 前段不包含（忽略大小写）
   *
   * @类似于 !/^value.*$/i.test(id)
   */
  前段不包含_忽略大小写 = 'NotInStartIgnoreCase',
  /**
   * 后段包含
   *
   * @类似于 /^.*value$/.test(id)
   */
  后段包含 = 'InEnd',
  /**
   * 后段包含（忽略大小写）
   *
   * @类似于 /^.*value$/i.test(id)
   */
  后段包含_忽略大小写 = 'InEndIgnoreCase',
  /**
   * 后段不包含
   *
   * @类似于 !/^.*value$/.test(id)
   */
  后段不包含 = 'NotInEnd',
  /**
   * 后段不包含（忽略大小写）
   *
   * @类似于 !/^.*value$/i.test(id)
   */
  后段不包含_忽略大小写 = 'NotInEndIgnoreCase',
  /**
   * 包含于
   *
   * @类似于 /^.*id.*$/.test(value)
   */
  包含于 = 'IncludedIn',
  /**
   * 包含于（忽略大小写）
   *
   * @类似于 /^.*id.*$/i.test(value)
   */
  包含于_忽略大小写 = 'IncludedInIgnoreCase',
  /**
   * 不包含于
   *
   * @类似于 !/^.*id.*$/.test(value)
   */
  不包含于 = 'NotIncludedIn',
  /**
   * 不包含于（忽略大小写）
   *
   * @类似于 !/^.*id.*$/i.test(value)
   */
  不包含于_忽略大小写 = 'NotIncludedInIgnoreCase',
  /**
   * 在集合中
   *
   * @类似于 value.filter(item => item == id).length > 0
   */
  在集合中 = 'InSet',
  /**
   * 在集合中（忽略大小写）
   *
   * @类似于 value.filter(item => /^item$/i.test(id)).length > 0
   */
  在集合中_忽略大小写 = 'InSetIgnoreCase',
  /**
   * 不在集合中
   *
   * @类似于 value.filter(item => item == id).length == 0
   */
  不在集合中 = 'NotInSet',
  /**
   * 不在集合中（忽略大小写）
   *
   * @类似于 value.filter(item => /^item$/i.test(id)).length == 0
   */
  不在集合中_忽略大小写 = 'NotInSetIgnoreCase',
  /**
   * 范围
   *
   * @类似于 id >= value1 && id < value2
   */
  范围 = 'Range',
  /**
   * 日期范围
   * <p>值需要进行逗号分隔，不需要添加单引号</p>
   * <p>这是专门为日期范围查询定制的操作符，它会处理 date2 + 1，比如：</p>
   * <p>当 date2 选择的是 2020-05-30，那查询的时候是 小于 2020-05-31</p>
   * <p>当 date2 选择的是 2020-05，那查询的时候是 小于 2020-06</p>
   * <p>当 date2 选择的是 2020，那查询的时候是 小于 2021</p>
   * <p>当 date2 选择的是 2020-05-30 12，那查询的时候是 小于 2020-05-30 13</p>
   * <p>当 date2 选择的是 2020-05-30 12:30，那查询的时候是 小于 2020-05-30 12:31</p>
   * <p>当 date2 选择的是 2020-05-30 12:30:30，那查询的时候是 小于 2020-05-30 12:30:31</p>
   * <p>并且 date2 只支持以上 6 种格式 (date1 没有限制)</p>
   *
   * @类似于 id >= value1 && id < value2
   */
  日期范围 = 'DateRange',
  /**
   * 严格模式的日期范围
   * <p>传的什么值，就会使用什么值进行判断</p>
   *
   * @类似于 id >= value1 && id < value2
   */
  严格模式的日期范围 = 'DateRangeStrict',
}
