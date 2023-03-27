<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成			  														                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 16:21:50                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


常量/枚举数据管理页

author admin
date 2022-07-04

-->
<template>
  <div class="app-container">
    <simple-table
      :load-list="loadTableList"
      :auto-load="false"
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
              v-model="renderData.searchParameter.key.value"
              placeholder="筛选键"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.value.value"
              placeholder="筛选值"
            />
          </el-col>

          <el-col :span="6">
            <simple-select
              :load-options="ConstEnumService.selectOptionList"
              placeholder="筛选所属常量/枚举"
              v-model="renderData.searchParameter.cEIds.value"
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
          <const-enum-data-add
            v-if="renderData.dialogParam.type === '新增'"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <const-enum-data-edit
            v-if="renderData.dialogParam.type === '编辑'"
            :id="renderData.selectDataId"
            @close="renderData.dialogParam.visible = false"
            @submitted="reloadTable"
          />
          <const-enum-data-details
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
<script lang="ts" name="constEnumData" setup>
  import ConstEnumDataService from '@/api/service/cagc/ConstEnumDataService';
  import ConstEnumService from '@/api/service/cagc/ConstEnumService';
  import { CED_Fields } from '@/api/dto/cagc/constEnumData/CED_Fields';
  import SimpleTable from '@/components/SimpleTable/index.vue';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';
  import SimpleTagList from '@/components/SimpleTagList/index.vue';
  import ColumnConfig from '@/components/SimpleTable/model/ColumnConfig';
  import PaginationConfig from '@/components/SimpleTable/model/PaginationConfig';
  import ConstEnumDataAdd from './add.vue';
  import ConstEnumDataDetails from './details.vue';
  import ConstEnumDataEdit from './edit.vue';
  import {
    Search,
    CirclePlus,
    Delete,
    EditPen,
    Document,
  } from '@element-plus/icons-vue';
  import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';
  import { getCurrentInstance, reactive, ref } from 'vue';
  import DialogParam from '@/utils/DialogParam';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRoute } from 'vue-router';
  import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
  import { List as ConstEnumDataList } from '@/api/dto/cagc/ConstEnumData/List';
  import RuoyiResultDTO from '@/api/dto/utils/response/RuoyiResultDTO';
  import { IOpenApi as TableOpenApi } from '@/components/SimpleTable/model/IOpenApi';
  import SearchExtension from '@/api/utils/search/SearchExtension';
  import ParameterConfig from '@/api/utils/search/ParameterConfig';

  //路由
  const route = useRoute();

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
       * 键
       */
      key: {
        field: CED_Fields.key,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 值
       */
      value: {
        field: CED_Fields.value,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 所属常量/枚举
       */
      cEIds: {
        field: CED_Fields.cEId,
        filterCompare: FilterCompare.在集合中,
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
          label: '所属常量/枚举',
          prop: CED_Fields.cEName,
          width: 200,
        },
        {
          label: '键',
          prop: CED_Fields.key,
          width: 200,
        },
        {
          label: '值',
          prop: CED_Fields.value,
          width: 200,
        },
        {
          label: '描述',
          prop: CED_Fields.description,
          width: 300,
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
   * 加载表格数据集合
   */
  const loadTableList = async (): Promise<ConstEnumDataList[]> => {
    //获取搜索参数
    dataSearch.filters = SearchExtension.getFilters(renderData.searchParameter);

    //获取数据
    const data = (await ConstEnumDataService.list(
      dataSearch
    )) as RuoyiResultDTO<ConstEnumDataList>;

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
          const msg = await ConstEnumDataService.delete_(ids);
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

  /**
   * 初始化方法
   */
  (async () => {
    //如果是页面跳转来的，则需要自动设置搜索参数
    if (route.params.c_e_id && route.params.c_e_id != ':c_e_id') {
      renderData.searchParameter.ceIds.value.length = 0;
      renderData.searchParameter.ceIds.value.push(route.params.c_e_id);
    }

    await reloadTable();
  })();
</script>

<style scoped>
  .dialog-body {
    max-height: 600px;
    overflow-y: auto;
    padding: 10px;
  }
</style>
