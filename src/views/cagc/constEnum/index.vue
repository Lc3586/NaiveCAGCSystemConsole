<!--
常量/枚举管理页

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
          <el-col :span="6">
            <el-input
              v-model="renderData.searchParameter.name.value"
              placeholder="筛选名称"
            />
          </el-col>

          <el-col :span="6">
            <simple-select
              :load-options="getTypeSelectOptionList"
              placeholder="筛选类型"
              v-model="renderData.searchParameter.type.value"
              :multiple="true"
            />
          </el-col>

          <el-col :span="8">
            <el-input
              v-model="renderData.searchParameter.moduleName.value"
              placeholder="筛选所属模块"
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

      <template #dataCountColumn="{ scope }">
        <router-link
          :to="{ name: 'constEnumData', params: { c_e_id: scope.row.id } }"
        >
          <el-link type="primary" :underline="false" title="管理数据">
            {{ scope.row.dataCount }}
          </el-link>
        </router-link>
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
          <const-enum-add
            v-if="renderData.dialogParam.type === '新增'"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <const-enum-edit
            v-if="renderData.dialogParam.type === '编辑'"
            :id="renderData.selectDataId"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <const-enum-details
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
  import ConstEnumService from '@/api/service/cagc/ConstEnumService';
  import { CE_Fields } from '@/api/dto/cagc/constEnum/CE_Fields';
  import SimpleTable from '@/components/SimpleTable/index.vue';
  import ColumnConfig from '@/components/SimpleTable/model/ColumnConfig';
  import PaginationConfig from '@/components/SimpleTable/model/PaginationConfig';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';
  import ConstEnumAdd from './add.vue';
  import ConstEnumDetails from './details.vue';
  import ConstEnumEdit from './edit.vue';
  import {
    Search,
    CirclePlus,
    Delete,
    EditPen,
    Document,
  } from '@element-plus/icons-vue';
  import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';
  import { reactive } from 'vue';
  import DialogParam from '@/utils/DialogParam';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { IOpenApi as TableOpenApi } from '@/components/SimpleTable/model/IOpenApi';
  import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
  import SearchExtension from '@/api/utils/search/SearchExtension';
  import ParameterConfig from '@/api/utils/search/ParameterConfig';
  import { List as ConstEnumList } from '@/api/dto/cagc/constEnum/List';
  import RuoyiResultDTO from '@/api/dto/utils/response/RuoyiResultDTO';
  import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';

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
     * 搜索参数
     */
    searchParameter: {
      /**
       * 名称
       */
      name: {
        field: CE_Fields.name,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 类型
       */
      type: {
        field: CE_Fields.type,
        filterCompare: FilterCompare.在集合中,
        value: [] as string[],
      },

      /**
       * 所属模块
       */
      moduleName: {
        field: CE_Fields.moduleName,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: [] as string[],
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
          label: '名称',
          prop: CE_Fields.name,
          width: 200,
        },
        {
          label: '描述',
          prop: CE_Fields.description,
          width: 300,
        },
        {
          label: '数据量',
          prop: CE_Fields.dataCount,
          width: 90,
        },
        {
          label: '类型',
          prop: CE_Fields.type,
          width: 80,
        },
        {
          label: '所属模块',
          prop: CE_Fields.moduleName,
          width: 120,
        },
        {
          prop: 'operation',
          label: '操作',
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
   * 加载类型下拉框选项集合
   */
  const getTypeSelectOptionList = async (): Promise<SelectOptionDTO<any>[]> => {
    return [
      { text: '常量', value: '常量' },
      { text: '枚举', value: '枚举' },
    ];
  };

  /**
   * 加载表格数据集合
   */
  const loadTableList = async (): Promise<ConstEnumList[]> => {
    //获取搜索参数
    dataSearch.filters = SearchExtension.getFilters(renderData.searchParameter);

    //获取数据
    const data = (await ConstEnumService.list(
      dataSearch
    )) as RuoyiResultDTO<ConstEnumList>;

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
          const msg = await ConstEnumService.delete_(ids);
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
