<!--
数据库列管理页

author admin
date 2023-03-14

-->
<template>
  <div class="app-container">
    <simple-table
      :load-list="loadTableList"
      :columns="renderData.tableConfig.columns"
      :pagination="renderData.tableConfig.pagination"
      @set-open-api="setTableOpenApi"
      @page-index-change="pageIndexChange"
      @page-size-change="pageSizeChange"
    >
      <template #headerTools="{ tableInfo }">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button
              type="primary"
              :icon="CirclePlus"
              @click="openDrawer('新增')"
            >
              新增
            </el-button>
            <el-button
              type="danger"
              :icon="Delete"
              plain
              :disabled="!tableInfo.anySelected"
              @click="batchDelete(tableInfo.selectKeys)"
            >
              批量删除
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.name.value"
              placeholder="筛选列名"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.title.value"
              placeholder="筛选标题/名称"
            />
          </el-col>

          <el-col :span="6">
            <simple-select
              :load-options="TableService.synchronizedTableSelectOptionList"
              placeholder="筛选所属表"
              v-model="renderData.searchParameter.tableIds.value"
              :multiple="true"
            />
          </el-col>

          <el-col :span="6">
            <simple-tag-list
              v-model="renderData.searchParameter.tags.value"
              name="其他标签"
            />
          </el-col>

          <el-col :span="4">
            <el-button
              type="primary"
              :icon="Search"
              :loading="renderData.reloading"
              @click="reloadTable"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </template>

      <template #columnSortColumn="{ scope }">
        <el-button
          type="info"
          link
          :icon="Bottom"
          title="置底"
          @click="sort(scope.row.id, SortMethod.置底)"
          :loading="renderData.sortLoading"
        />

        <el-button
          type="success"
          link
          :icon="SortDown"
          title="下移"
          @click="sort(scope.row.id, SortMethod.下移)"
          :loading="renderData.sortLoading"
        />

        <el-button
          type="primary"
          link
          :icon="SortUp"
          title="上移"
          @click="sort(scope.row.id, SortMethod.上移)"
          :loading="renderData.sortLoading"
        />

        <el-button
          type="info"
          link
          :icon="Top"
          title="置顶"
          @click="sort(scope.row.id, SortMethod.置顶)"
          :loading="renderData.sortLoading"
        />
      </template>

      <template #___actionColumn="{ scope }">
        <el-button
          type="info"
          link
          :icon="Document"
          @click="openDrawer('详情', scope.row)"
        >
          详情
        </el-button>
        <el-button
          type="warning"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          link
          :icon="Delete"
          @click="delete_(scope.row)"
        >
          删除
        </el-button>
      </template>
    </simple-table>

    <el-dialog
      v-model="renderData.dialogParam.visible"
      :title="renderData.dialogParam.title"
      :width="renderData.dialogParam.width"
    >
      <template #default>
        <div class="dialog-body pretty-scrollbar">
          <column-add
            v-if="renderData.dialogParam.type === '新增'"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <column-edit
            v-if="renderData.dialogParam.type === '编辑'"
            :id="renderData.selectDataId"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <column-details
            v-if="renderData.dialogParam.type === '详情'"
            :id="renderData.selectDataId"
          />
        </div>
      </template>
      <template #footer v-if="renderData.dialogParam.showCloseBtn">
        <div class="dialog-footer">
          <el-button @click="renderData.dialogParam.visible = false"
            >关闭</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import ColumnService from '@/api/service/cagc/ColumnService';
  import { C_Fields } from '@/api/dto/cagc/column/C_Fields';
  import SimpleTable from '@/components/SimpleTable/index.vue';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';
  import SimpleTagList from '@/components/SimpleTagList/index.vue';
  import ColumnConfig from '@/components/SimpleTable/model/ColumnConfig';
  import PaginationConfig from '@/components/SimpleTable/model/PaginationConfig';
  import ColumnAdd from './add.vue';
  import ColumnDetails from './details.vue';
  import ColumnEdit from './edit.vue';
  import {
    Search,
    CirclePlus,
    Delete,
    EditPen,
    Document,
    SortUp,
    SortDown,
    Top,
    Bottom,
  } from '@element-plus/icons-vue';
  import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';
  import { reactive } from 'vue';
  import DialogParam from '@/utils/DialogParam';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import TableService from '@/api/service/cagc/TableService';
  import { SortMethod } from '@/api/dto/utils/request/SortMethod';
  import DataSortDTO from '@/api/dto/utils/request/DataSortDTO';
  import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
  import { List as ColumnList } from '@/api/dto/cagc/column/List';
  import RuoyiResultDTO from '@/api/dto/utils/response/RuoyiResultDTO';
  import { IOpenApi as TableOpenApi } from '@/components/SimpleTable/model/IOpenApi';
  import SearchExtension from '@/api/utils/search/SearchExtension';
  import ParameterConfig from '@/api/utils/search/ParameterConfig';

  // 获取表格开放的接口
  let tableOpenApi = null as TableOpenApi | null;

  /**
   * 搜索参数
   */
  const dataSearch = new DataSearchDTO();

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载中
     */
    reloading: false,

    /**
     * 当前数据行的Id
     */
    selectDataId: '' as string,

    /**
     * 对话框参数
     */
    dialogParam: new DialogParam(),

    /**
     * 启用/禁用操作状态
     */
    enableLoading: false,

    /**
     * 锁定/解锁操作状态
     */
    lockLoading: false,

    /**
     * 排序操作状态
     */
    sortLoading: false,

    /**
     * 搜索参数
     */
    searchParameter: {
      /**
       * 列名
       */
      name: {
        field: C_Fields.name,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 标题/名称
       */
      title: {
        field: C_Fields.title,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 所属表
       */
      tableIds: {
        field: C_Fields.tableId,
        filterCompare: FilterCompare.在集合中,
        value: [] as string[],
      },

      /**
       * 其他标签
       */
      tags: {
        field: C_Fields.tags,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: [] as string[],
        resolveValue: (value: string[]): string => value.join(','),
      },
    } as Record<string, ParameterConfig>,

    /**
     * 数据表格配置
     */
    tableConfig: {
      /**
       * 数据列
       */
      columns: [
        {
          label: '列名',
          prop: C_Fields.name,
          width: 150,
        },
        {
          label: '名称',
          prop: C_Fields.title,
          width: 150,
        },
        {
          label: '所属表',
          prop: C_Fields.tableName,
          width: 150,
        },
        {
          label: 'java类型',
          prop: C_Fields.javaType,
          width: 90,
        },
        {
          label: '列表',
          prop: C_Fields.list,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '详情',
          prop: C_Fields.detail,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '新增',
          prop: C_Fields.create,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '编辑',
          prop: C_Fields.edit,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '启用/禁用',
          prop: C_Fields.enable,
          width: 90,
          bool2Icon: true,
        },
        {
          label: '锁定/解锁',
          prop: C_Fields.lock,
          width: 90,
          bool2Icon: true,
        },
        {
          label: '排序',
          prop: C_Fields.sort,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '父级id',
          prop: C_Fields.treeParentId,
          width: 90,
          bool2Icon: true,
        },
        {
          label: '根id',
          prop: C_Fields.treeRootId,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '级别',
          prop: C_Fields.treeLevel,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '导入',
          prop: C_Fields.import_,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '导出',
          prop: C_Fields.export,
          width: 60,
          bool2Icon: true,
        },
        {
          label: '其它标签',
          prop: C_Fields.tagList,
          width: 150,
          enableTags: true,
        },
        {
          label: '排序',
          prop: C_Fields.columnSort,
          width: 120,
          fixed: 'right',
        },
      ] as ColumnConfig[],
      /**
       * 分页参数
       */
      pagination: {
        pageIndex: dataSearch.pagination.pageNum,
        pageSize: dataSearch.pagination.pageSize,
      } as PaginationConfig,
    },
  });

  /**
   * 加载表格数据集合
   */
  const loadTableList = async (): Promise<ColumnList[]> => {
    //获取搜索参数
    dataSearch.filters = SearchExtension.getFilters(renderData.searchParameter);

    //获取数据
    const data = (await ColumnService.list(
      dataSearch
    )) as RuoyiResultDTO<ColumnList>;

    return data.rows;
  };

  /**
   *
   * @param openapi 设置表格的开放接口
   */
  const setTableOpenApi = (openapi: TableOpenApi) => {
    tableOpenApi = openapi;
  };

  /**
   * 页面数据量变更
   *
   * @param pageSize 页面数据量
   */
  const pageSizeChange = async (pageSize: number) => {
    dataSearch.pagination.pageSize = pageSize;
    await reloadTable();
  };

  /**
   * 页码变更
   *
   * @param pageIndex 页码
   */
  const pageIndexChange = async (pageIndex: number) => {
    dataSearch.pagination.pageNum = pageIndex;
    await reloadTable();
  };

  /**
   * 重新加载表格数据
   */
  const reloadTable = async () => {
    renderData.reloading = true;
    await tableOpenApi?.reload();
    renderData.reloading = false;
  };

  /**
   * 排序
   *
   * @param id 主键
   * @param method 排序方法
   */
  const sort = async (id: string, method: SortMethod) => {
    try {
      renderData.sortLoading = true;
      await ColumnService.sort(new DataSortDTO<string>(id, method, 1));
      await reloadTable();
      renderData.sortLoading = false;
    } catch (ex: any) {
      renderData.sortLoading = false;
      console.error(ex);
      ElMessage({
        type: 'error',
        message: ex.message,
      });
    }
  };

  /**
   * 操作
   *
   * @param type 类型
   * @param row  数据行
   */
  const openDrawer = async (type: string, row?: any) => {
    switch (type) {
      case '详情':
        renderData.dialogParam.showCloseBtn = true;
        renderData.selectDataId = row.id;
        break;
      case '新增':
        renderData.dialogParam.showCloseBtn = false;
        break;
      case '编辑':
        renderData.dialogParam.showCloseBtn = false;
        renderData.selectDataId = row.id;
        break;
    }

    renderData.dialogParam.width = '30%';
    renderData.dialogParam.visible = true;
    renderData.dialogParam.title = type;
    renderData.dialogParam.type = type;
  };

  /**
   * 单个删除
   *
   * @param id id
   */
  const delete_ = ({ id }: { id: string }) => {
    handlerDelete([id]);
  };

  /**
   * 批量删除
   *
   * @param ids id集合
   */
  const batchDelete = (ids: string[]) => {
    handlerDelete(ids);
  };

  /**
   * 处理删除操作
   *
   * @param ids id集合
   */
  const handlerDelete = (ids: string[]) => {
    if (ids.length === 0) {
      ElMessage({
        type: 'error',
        message: '请先选择数据',
      });
      return;
    }

    ElMessageBox.confirm(`确定要删除这${ids.length}条数据吗？`, '系统警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        try {
          const msg = await ColumnService.delete_(ids);
          ElMessage({
            type: 'success',
            message: msg,
          });
          await reloadTable();
        } catch (ex: any) {
          console.error(ex);
          ElMessage({
            type: 'error',
            message: ex.message,
          });
        }
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
</script>

<style scoped>
  .dialog-body {
    max-height: 600px;
    overflow-y: auto;
    padding: 10px;
  }
</style>
