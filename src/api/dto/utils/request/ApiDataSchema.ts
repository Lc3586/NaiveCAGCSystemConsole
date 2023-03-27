/**
 * 后端接口数据结构方案
 *
 * @author LCTR
 * @date 2022-06-21
 */
export const enum ApiDataSchema {
  /**
   * 默认为 Ruoyi
   */
  默认 = 'Default',
  /**
   * @see https://www.layui.com/doc/modules/table.html#response
   */
  Layui = 'Layui',
  /**
   * @see https://blog.mn886.net/jqGrid/api/jsondata/index.jsp
   */
  JqGrid = 'JqGrid',
  /**
   * @see http://www.jeasyui.net/plugins/183.html
   */
  Easyui = 'Easyui',
  /**
   * @see https://bootstrap-table.com/docs/api/table-options
   */
  BootstrapTable = 'BootstrapTable',
  /**
   * @see https://www.antdv.com/components/list-cn/#api
   */
  AntdVue = 'AntdVue',
  /**
   * @see https://element-plus.org/#/zh-CN/component/pagination
   */
  ElementVue = 'ElementVue',
  /**
   * 偌依框架默认数据结构
   */
  Ruoyi = 'Ruoyi',
}
