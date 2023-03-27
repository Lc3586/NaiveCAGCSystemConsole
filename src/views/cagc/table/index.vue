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
          <el-col :span="12">
            <el-button
              type="primary"
              :icon="CirclePlus"
              @click="openDrawer('新增')"
            >
              新增
            </el-button>

            <el-button
              type="primary"
              :icon="MagicStick"
              @click="openDrawer('同步')"
            >
              同步
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

            <el-button
              type="success"
              :icon="Present"
              plain
              :disabled="!tableInfo.anySelected"
              @click="batchDownload(tableInfo.selectKeys)"
            >
              批量生成
            </el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.name.value"
              placeholder="筛选表名"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.title.value"
              placeholder="筛选标题/名称"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.moduleName.value"
              placeholder="筛选所属模块"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.businessName.value"
              placeholder="筛选业务名称"
            />
          </el-col>

          <el-col :span="4">
            <el-input
              v-model="renderData.searchParameter.group.value"
              placeholder="筛选所属分组"
            />
          </el-col>

          <el-col :span="2">
            <el-input
              v-model="renderData.searchParameter.signature.value"
              placeholder="筛选署名"
            />
          </el-col>

          <el-col :span="2">
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
          :to="{ name: 'CagcColumnIndex', params: { table_id: scope.row.id } }"
        >
          <el-link type="primary" :underline="false" title="管理数据库列">
            {{ scope.row.columnCount }}
          </el-link>
        </router-link>
      </template>

      <template #___actionColumn="{ scope }">
        <el-button
          type="info"
          link
          :icon="Document"
          @click="openDrawer('详情', scope.row)"
          >详情</el-button
        >
        <el-button
          type="warning"
          link
          :icon="EditPen"
          @click="openDrawer('编辑', scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" link :icon="Delete" @click="delete_(scope.row)"
          >删除</el-button
        >
        <el-button
          type="success"
          link
          :icon="DataBoard"
          @click="openDrawer('预览', scope.row)"
          >预览</el-button
        >
        <el-button
          type="primary"
          link
          :icon="Present"
          @click="openDrawer('生成', scope.row)"
          >生成</el-button
        >
      </template>
    </simple-table>

    <el-dialog
      v-model="renderData.dialogParam.visible"
      :title="renderData.dialogParam.title"
      :width="renderData.dialogParam.width"
    >
      <template #default>
        <div class="dialog-body pretty-scrollbar">
          <table-add
            v-if="dialogParam.type === '新增'"
            @close="dialogParam.visible = false"
            @submitted="reloadTable"
          />

          <table-edit
            v-if="dialogParam.type === '编辑'"
            :id="renderData.selectDataId"
            @close="dialogParam.visible = false"
            @submitted="reloadTable"
          />

          <table-details
            v-if="dialogParam.type === '详情'"
            :id="renderData.selectDataId"
          />

          <table-sync
            v-if="dialogParam.type === '同步'"
            @synchronized="reloadTable"
            @close="dialogParam.visible = false"
          />

          <preview-code
            v-if="renderData.showPreview"
            :tableId="renderData.selectDataId"
            :packageName="cagcParam.packageName"
            :generateTypes="cagcParam.generateTypes"
            @close="
              dialogParam.visible = false;
              renderData.showPreview = false;
              dialogParam.width = '30%';
            "
            @download="handlerDownload"
          />

          <div v-if="renderData.showCagcParam">
            <el-form :model="cagcParam">
              <el-form-item label="包名">
                <el-input
                  v-model="cagcParam.packageName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <simple-checkbox
                :config="cagcParam.generateTypeCheckboxConfig"
                @change="handlerGenerateTypeCheckboxChange"
              />
            </el-form>
          </div>
        </div>
      </template>
      <template
        #footer
        v-if="
          renderData.dialogParam.showConfirmeBtn ||
          renderData.dialogParam.showCloseBtn
        "
      >
        <div class="dialog-footer">
          <el-button
            v-if="renderData.dialogParam.showConfirmeBtn"
            type="primary"
            @click="confirm"
            >确认</el-button
          >
          <el-button v-if="renderData.dialogParam.showCloseBtn" @click="close"
            >关闭</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import CagcService from '@/api/service/cagc/CagcService';
  import TableService from '@/api/service/cagc/TableService';
  import { T_Fields } from '@/api/dto/cagc/table/T_Fields';
  import SimpleTable from '@/components/SimpleTable/index.vue';
  import ColumnConfig from '@/components/SimpleTable/model/ColumnConfig';
  import PaginationConfig from '@/components/SimpleTable/model/PaginationConfig';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';
  import sync from './sync.vue';
  import TableAdd from './add.vue';
  import TableDetails from './details.vue';
  import TableEdit from './edit.vue';
  import PreviewCode from './preview.vue';
  import {
    Search,
    CirclePlus,
    Delete,
    MagicStick,
    EditPen,
    DataBoard,
    Present,
    Document,
  } from '@element-plus/icons-vue';
  import { FilterCompare } from '@/api/dto/utils/request/FilterCompare';
  import { getCurrentInstance, reactive, ref, toRefs } from 'vue';
  import DialogParam from '@/utils/DialogParam';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import {
    GenerateType,
    JavaGenerateTypes,
    OtherGenerateTypes,
    TSGenerateTypes,
    VueGenerateTypes,
  } from '@/api/dto/cagc/GenerateType';
  import SimpleCheckbox from '@/components/SimpleCheckbox/index.vue';
  import CheckboxConfig from '@/components/SimpleCheckbox/Model/CheckboxConfig';
  import CheckboxGroupParams from '@/components/SimpleCheckbox/Model/CheckboxGroupParams';
  import CheckboxValueInfo from '@/components/SimpleCheckbox/Model/CheckboxValueInfo';
  import { useRoute } from 'vue-router';
  import { IOpenApi as TableOpenApi } from '@/components/SimpleTable/model/IOpenApi';
  import DataSearchDTO from '@/api/dto/utils/request/DataSearchDTO';
  import SearchExtension from '@/api/utils/search/SearchExtension';
  import ParameterConfig from '@/api/utils/search/ParameterConfig';
  import { List as ConstEnumList } from '@/api/dto/cagc/constEnum/List';
  import RuoyiResultDTO from '@/api/dto/utils/response/RuoyiResultDTO';
  import SelectOptionDTO from '@/api/dto/utils/response/SelectOptionDTO';

  //路由
  const route = useRoute();

  // 获取表格开放的接口
  let tableOpenApi = null as TableOpenApi | null;

  /**
   * 搜索参数
   */
  const dataSearch = new DataSearchDTO();

  const tableSync = sync;

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
       * 表名
       */
      name: {
        field: T_Fields.name,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 标题/名称
       */
      title: {
        field: T_Fields.title,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 所属模块
       */
      moduleName: {
        field: T_Fields.moduleName,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 业务名称
       */
      businessName: {
        field: T_Fields.businessName,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 所属分组
       */
      group: {
        field: T_Fields.group,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },

      /**
       * 署名
       */
      signature: {
        field: T_Fields.signature,
        filterCompare: FilterCompare.包含_忽略大小写,
        value: '',
      },
    } as Record<string, ParameterConfig>,

    /**
     * 数据表格配置
     */
    tableConfig: {
      /**
       * 列配置
       */
      columns: [
        {
          label: '表名',
          prop: T_Fields.name,
          width: 200,
          search: true,
          sortable: true,
        },
        {
          label: '标题/名称',
          prop: T_Fields.title,
          width: 200,
          search: true,
          sortable: true,
        },
        {
          label: '数据库列',
          prop: T_Fields.columnCount,
          width: 90,
        },
        {
          label: '所属模块',
          prop: T_Fields.moduleName,
          width: 120,
          search: true,
          sortable: true,
        },
        {
          label: '业务名称',
          prop: T_Fields.businessName,
          width: 150,
          search: true,
          sortable: true,
        },
        {
          label: '所属分组',
          prop: T_Fields.group,
          width: 120,
          search: true,
          sortable: true,
        },
        {
          label: '署名',
          prop: T_Fields.signature,
          width: 80,
          search: true,
          sortable: true,
        },
        {
          label: '创建时间',
          width: 160,
          prop: T_Fields.createTime,
          search: false,
          sortable: true,
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

    /**
     * cagc接口服务参数
     */
    cagcParam: {
      /**
       * Id集合
       */
      tableIds: [] as string[],
      /**
       * 包名
       */
      packageName: 'com.ruoyi',
      /**
       * 生成类型多选框配置
       */
      generateTypeCheckboxConfig: new CheckboxConfig().setup((config) => {
        config.groups = [
          new CheckboxGroupParams().setup((params) => {
            params.name = 'Java生成类型';
            for (const name in JavaGenerateTypes) {
              params.allValues.push(
                new CheckboxValueInfo(name, JavaGenerateTypes[name])
              );
            }
            params.checkAll = true;
          }),
          new CheckboxGroupParams().setup((params) => {
            params.name = 'TS生成类型';
            for (const name in TSGenerateTypes) {
              params.allValues.push(
                new CheckboxValueInfo(name, TSGenerateTypes[name])
              );
            }
            params.checkAll = true;
          }),
          new CheckboxGroupParams().setup((params) => {
            params.name = 'Vue生成类型';
            for (const name in VueGenerateTypes) {
              params.allValues.push(
                new CheckboxValueInfo(name, VueGenerateTypes[name])
              );
            }
            params.checkAll = true;
          }),
          new CheckboxGroupParams().setup((params) => {
            params.name = '其他生成类型';
            for (const name in OtherGenerateTypes) {
              params.allValues.push(
                new CheckboxValueInfo(name, OtherGenerateTypes[name])
              );
            }
            params.checkAll = true;
          }),
        ];
      }),
      /**
       * Java生成类型集合
       */
      javaGenerateTypes: [] as GenerateType[],
      /**
       * TS生成类型集合
       */
      tsGenerateTypes: [] as GenerateType[],
      /**
       * Vue生成类型集合
       */
      vueGenerateTypes: [] as GenerateType[],
      /**
       * 其他生成类型集合
       */
      otherGenerateTypes: [] as GenerateType[],
      /**
       * 生成类型集合
       */
      generateTypes: [] as GenerateType[],
    },
    /**
     * 显示
     */
    showSync: false,
    /**
     * 显示cagc接口服务参数
     */
    showCagcParam: false,
    /**
     * 显示代码预览
     */
    showPreview: false,
  });

  /**
   * 单独解构的属性
   */
  const { dialogParam, cagcParam } = toRefs(renderData);

  /**
   * 选中数据变更事件
   *
   * @param values 选中值集合
   * @param groupIndex 分组索引
   * @param groupName 分组名称
   */
  const handlerGenerateTypeCheckboxChange = (
    values: any[],
    groupIndex: number,
    groupName: string
  ) => {
    switch (groupName) {
      case 'Java生成类型':
        renderData.cagcParam.javaGenerateTypes = values;
        break;
      case 'TS生成类型':
        renderData.cagcParam.tsGenerateTypes = values;
        break;
      case 'Vue生成类型':
        renderData.cagcParam.vueGenerateTypes = values;
        break;
      case '其他生成类型':
        renderData.cagcParam.otherGenerateTypes = values;
        break;
    }
  };

  /**
   * 合并生成类型
   */
  const concatGenerateTypes = () => {
    renderData.cagcParam.generateTypeCheckboxConfig.groups[0].checkAll =
      renderData.cagcParam.javaGenerateTypes.length ===
      renderData.cagcParam.generateTypeCheckboxConfig.groups[0].allValues
        .length;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[0].selectedValues =
      renderData.cagcParam.javaGenerateTypes;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[1].checkAll =
      renderData.cagcParam.javaGenerateTypes.length ===
      renderData.cagcParam.generateTypeCheckboxConfig.groups[1].allValues
        .length;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[1].selectedValues =
      renderData.cagcParam.tsGenerateTypes;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[2].checkAll =
      renderData.cagcParam.javaGenerateTypes.length ===
      renderData.cagcParam.generateTypeCheckboxConfig.groups[2].allValues
        .length;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[2].selectedValues =
      renderData.cagcParam.vueGenerateTypes;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[3].checkAll =
      renderData.cagcParam.javaGenerateTypes.length ===
      renderData.cagcParam.generateTypeCheckboxConfig.groups[3].allValues
        .length;
    renderData.cagcParam.generateTypeCheckboxConfig.groups[3].selectedValues =
      renderData.cagcParam.otherGenerateTypes;
    renderData.cagcParam.generateTypes = renderData.cagcParam.javaGenerateTypes
      .concat(renderData.cagcParam.tsGenerateTypes)
      .concat(renderData.cagcParam.vueGenerateTypes)
      .concat(renderData.cagcParam.otherGenerateTypes);
  };

  /**
   * 加载表格数据集合
   */
  const loadTableList = async (): Promise<ConstEnumList[]> => {
    //获取搜索参数
    dataSearch.filters = SearchExtension.getFilters(renderData.searchParameter);

    //获取数据
    const data = (await TableService.list(
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
        renderData.showCagcParam = false;
        renderData.showPreview = false;
        renderData.dialogParam.width = '30%';
        renderData.dialogParam.showConfirmeBtn = false;
        renderData.dialogParam.showCloseBtn = true;
        renderData.selectDataId = row.id;
        break;
      case '新增':
        renderData.showCagcParam = false;
        renderData.showPreview = false;
        renderData.dialogParam.width = '30%';
        renderData.dialogParam.showConfirmeBtn = false;
        renderData.dialogParam.showCloseBtn = false;
        break;
      case '编辑':
        renderData.showCagcParam = false;
        renderData.showPreview = false;
        renderData.dialogParam.width = '30%';
        renderData.dialogParam.showConfirmeBtn = false;
        renderData.dialogParam.showCloseBtn = false;
        renderData.selectDataId = row.id;
        break;
      case '同步':
        renderData.showCagcParam = false;
        renderData.showPreview = false;
        renderData.dialogParam.width = '50%';
        renderData.dialogParam.showConfirmeBtn = false;
        renderData.dialogParam.showCloseBtn = false;
        break;
      case '生成':
        renderData.dialogParam.width = '80%';
        renderData.dialogParam.showConfirmeBtn = true;
        renderData.dialogParam.showCloseBtn = true;
        renderData.showCagcParam = true;
        renderData.showPreview = false;
        renderData.cagcParam.tableIds = [row.id];
        break;
      case '预览':
        renderData.dialogParam.width = '80%';
        renderData.dialogParam.showConfirmeBtn = true;
        renderData.dialogParam.showCloseBtn = true;
        renderData.showCagcParam = true;
        renderData.showPreview = false;
        renderData.selectDataId = row.id;
        renderData.cagcParam.tableIds = [row.id];
        break;
      case '批量生成':
        renderData.dialogParam.width = '80%';
        renderData.dialogParam.showConfirmeBtn = true;
        renderData.dialogParam.showCloseBtn = true;
        renderData.showCagcParam = true;
        renderData.showPreview = false;
        break;
    }

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

    ElMessageBox.confirm(
      `确定要删除这${ids.length}条数据吗？（数据表相关的列也会一并删除）`,
      '系统警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        try {
          const msg = await TableService.delete(ids);
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
   * 批量生成
   *
   * @param ids id集合
   */
  const batchDownload = (ids: string[]) => {
    if (ids.length == 0) {
      ElMessage({
        type: 'error',
        message: '请先选择数据',
      });
      return;
    }
    renderData.cagcParam.tableIds = ids;
    openDrawer('批量生成');
  };

  /**
   * 处理生成操作
   */
  const handlerDownload = () => {
    CagcService.downloadCode(
      renderData.cagcParam.tableIds,
      renderData.cagcParam.packageName,
      renderData.cagcParam.generateTypes
    );
  };

  /**
   * 会话框确定按钮单击回调事件
   */
  const confirm = async () => {
    switch (renderData.dialogParam.type) {
      case '预览':
        concatGenerateTypes();
        renderData.dialogParam.showConfirmeBtn = false;
        renderData.dialogParam.showCloseBtn = false;
        renderData.showCagcParam = false;
        renderData.dialogParam.width = '80%';
        renderData.showPreview = true;
        break;
      case '生成':
      case '批量生成':
        concatGenerateTypes();
        handlerDownload();
        break;
    }
  };

  /**
   * 关闭弹窗
   */
  const close = () => {
    console.info('close');
    switch (renderData.dialogParam.type) {
      case '预览':
        renderData.showCagcParam = false;
        break;
    }

    renderData.dialogParam.visible = false;
  };
</script>

<style scoped>
  .dialog-body {
    max-height: 650px;
    overflow-y: auto;
    padding: 10px;
  }
</style>
