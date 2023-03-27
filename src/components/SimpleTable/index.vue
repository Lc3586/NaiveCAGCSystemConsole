<template>
  <el-row :gutter="20">
    <slot name="headerTools" :tableInfo="tableInfo"></slot>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="24">
      <el-table
        :data="renderData.list"
        stripe
        :empty-text="renderData.error"
        v-loading="renderData.loading"
        @sort-change="sortChange"
        :style="props.style"
        :row-class-name="rowClassName"
      >
        <el-table-column
          v-if="props.enableIndex"
          type="index"
        ></el-table-column>

        <el-table-column
          v-if="props.enableCheckBox"
          type="selection"
        ></el-table-column>

        <el-table-column
          v-for="column in props.columns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          :sortable="column.sortable ?? false"
          :width="column.width ?? ''"
          :fixed="column.fixed ?? ''"
          :formatter="
            (row, prop, cellValue, index) =>
              columnFormatter(row, prop, cellValue, index, column)
          "
        >
          <template #default="scope">
            <slot :name="column.prop + 'Column'" :scope="scope"></slot>

            <div
              v-if="
                column.enableImagePreview === true &&
                column.resolveImagePreviewSrc != undefined
              "
              style="display: flex; align-items: center"
            >
              <el-image
                :preview-src-list="
                  column.resolveImagePreviewSrc(scope.row, column)
                "
              />
            </div>

            <div v-if="column.bool2Icon === true">
              <el-icon>
                <SuccessFilled v-if="scope.row[column.prop] === true" />
                <CircleCloseFilled v-if="scope.row[column.prop] === true" />
              </el-icon>
            </div>

            <div v-if="column.enableTags === true">
              <simple-tag-list
                :load-list="
                  () =>
                    column.resolveTags
                      ? column.resolveTags(scope.row, column)
                      : scope.row[column.prop]
                "
                :name="column.label"
                :readonly="true"
              />
            </div>

            <div
              v-if="
                column.enableEnum === true && column.resolveEnums != undefined
              "
            >
              <span>{{ column.resolveEnums(scope.row, column) }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="props.enableActionColumn" align="center">
          <template #default="scope">
            <slot name="___actionColumn" :scope="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row :gutter="20" v-if="props.enablePagination">
    <el-col :span="24">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageIndexChange"
        :current-page="currentPageIndex"
        :page-sizes="sizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :hide-on-single-page="hidePagination"
        :total="dataRows"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { CSSProperties, reactive } from 'vue';
  import ColumnConfig from './model/ColumnConfig';
  import { IOpenApi } from './model/IOpenApi';
  import PaginationConfig from './model/PaginationConfig';
  import { dayjs, TableColumnCtx } from 'element-plus';
  import { SuccessFilled, CircleCloseFilled } from '@element-plus/icons-vue';
  import SimpleTagList from '@/components/SimpleTagList/index.vue';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    loading: true,
    list: [] as any[],
    error: '',
  });

  /**
   * 表格信息
   */
  const tableInfo = reactive({
    /**
     * 是否选中了任意数据
     */
    anySelected: false,

    /**
     * 全选状态
     */
    allSelected: false,

    /**
     * 选中项集合
     * @remark 值来自于isKey=true的列
     */
    selectKeys: [],
  });

  // 组件属性
  const props = withDefaults(
    defineProps<{
      /**
       * 加载数据集合的方法
       */
      loadList: () => Promise<any[]>;

      /**
       * 自动加载数据
       *
       * @默认值 true
       */
      autoLoad?: boolean;

      /**
       * 列配置
       */
      columns?: Array<ColumnConfig>;

      /**
       * 启用索引
       *
       * @默认值 true
       */
      enableIndex?: boolean;

      /**
       * 启用复选框
       *
       * @默认值 true
       */
      enableCheckBox?: boolean;

      /**
       * 启用操作列
       *
       * @默认值 true
       */
      enableActionColumn?: boolean;

      /**
       * 启用分页
       *
       * @默认值 true
       */
      enablePagination?: boolean;

      /**
       * 分页配置
       */
      pagination?: PaginationConfig;

      /**
       * 自定义样式
       */
      style?: CSSProperties;

      /**
       * 设置自定义类名
       */
      resolveClassName?: (value: {
        row: Record<string, string>;
        rowIndex: number;
      }) => string;
    }>(),
    {
      loadList: async () => {
        return new Promise<any[]>((resolve) => {
          resolve([]);
        });
      },
      autoLoad: true,
      columns: () => [],
      checkBox: true,
      enableActionColumn: true,
      enablePagination: true,
      pagination: () => {
        return {
          pageIndex: 1,
          pageSize: 50,
          sizes: [5, 10, 15, 20, 50, 100, 150, 200],
        };
      },
      style: () => {
        return {};
      },
      resolveClassName: () => '',
    }
  );

  /**
   * 列的类名
   */
  const rowClassName = (value: {
    row: Record<string, string>;
    rowIndex: number;
  }): string => {
    return props.resolveClassName ? props.resolveClassName(value) : '';
  };

  /**
   * 当前页码
   */
  const currentPageIndex = computed((): number => {
    return props.pagination.pageIndex;
  });

  /**
   * 每页数据量
   */
  const pageSize = computed((): number => {
    return props.pagination.pageSize;
  });

  /**
   * 总数据量
   */
  const dataRows = computed((): number => {
    return renderData.list == null ? 0 : renderData.list.length;
  });

  /**
   * 总页数
   */
  const pageTotal = computed((): number => {
    return (
      dataRows.value / pageSize.value +
      (dataRows.value % pageSize.value > 0 ? 1 : 0)
    );
  });

  /**
   * 是否隐藏分页组件
   */
  const hidePagination = computed((): boolean => {
    return pageTotal.value == 1;
  });

  /**
   * 数据量选项
   */
  const sizes = computed((): number[] => {
    return props.pagination.sizes;
  });

  /**
   * 格式化
   * @param row
   * @param prop
   * @param cellValue
   * @param index
   * @param columnConfig
   */
  const columnFormatter = (
    row: any,
    prop: TableColumnCtx<any>,
    cellValue: any,
    index: number,
    columnConfig: ColumnConfig
  ): string => {
    const value = row[prop.prop];
    if (
      columnConfig.dateFormate != undefined &&
      columnConfig.dateFormate != null &&
      columnConfig.dateFormate != '' &&
      value &&
      value != ''
    )
      return dayjs(value as Date).format(columnConfig.dateFormate);
    return value;
  };

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 设置组件开放的接口
     *
     * @param e
     * @param value 选中的值
     */
    (e: 'setOpenApi', openApi: IOpenApi): void;

    /**
     * 排序
     *
     * @param e
     * @param value 选中的值
     */
    (
      e: 'sortChange',
      value: { column: string; prop: string; order: 'ascending' | 'descending' }
    ): void;

    /**
     * 页面数据量变更
     *
     * @param e
     * @param pageSize 页面数据量
     */
    (e: 'pageSizeChange', pageSize: number): void;

    /**
     * 页码变更
     *
     * @param e
     * @param pageIndex 页码
     */
    (e: 'pageIndexChange', pageIndex: number): void;
  }>();

  /**
   * 排序
   *
   * @param value 选中的值
   */
  const sortChange = (value: {
    column: string;
    prop: string;
    order: 'ascending' | 'descending';
  }) => {
    emit('sortChange', value);
  };

  /**
   * 页面数据量变更
   *
   * @param pageSize 页面数据量
   */
  const pageSizeChange = (pageSize: number) => {
    emit('pageSizeChange', pageSize);
  };

  /**
   * 页码变更
   *
   * @param pageIndex 页码
   */
  const pageIndexChange = (pageIndex: number) => {
    emit('pageIndexChange', pageIndex);
  };

  /**
   * 初始化方法
   */
  async () => {
    const openApi = {
      reload: async () => {
        renderData.loading = true;
        props
          .loadList()
          .then((list) => {
            renderData.list = list;
            renderData.loading = false;
          })
          .catch((error) => {
            renderData.error = error.message;
            renderData.loading = false;
          });
      },
    } as IOpenApi;

    //设置组件开放的接口
    emit('setOpenApi', openApi);

    if (props.autoLoad === true) await openApi.reload();
  };
</script>

<style scoped></style>
