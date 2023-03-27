<template>
  <simple-skeleton
    :loading="renderData.loading"
    :lattice="renderData.lattice"
  />

  <div v-if="!renderData.loading">
    <el-select
      v-model="renderData.tableNames"
      multiple
      filterable
      placeholder="选中要同步的数据表"
      style="width: 80%"
    >
      <el-option
        v-for="(comment, name) in renderData.tableMap"
        :key="name"
        :label="`${name}（${comment ?? ''}）`"
        :value="name"
      />
    </el-select>
  </div>

  <div class="dialog-footer">
    <el-button @click="emit('close', renderData.tableNames)">关闭</el-button>
    <el-button
      v-if="!renderData.loading"
      type="primary"
      @click="syncAsync"
      :loading="renderData.processing"
      >同步
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  import TableService from '@/api/service/cagc/TableService';
  import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';
  import CellConfig from '@/components/SimpleSkeleton/Model/CellConfig';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 骨架框点阵
     */
    lattice: [[new CellConfig(24)]],
    /**
     * 处理中
     */
    processing: false,
    /**
     * 所有表
     * &#60;表名, 注释&#62;
     */
    tableMap: {} as Record<string, string>,
    /**
     * 选中的表名集合
     */
    tableNames: [] as string[],
  });

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 关闭窗口
     *
     * @param e
     * @param tableNames 表名集合
     */
    (e: 'close', tableNames: string[]): void;
    /**
     * 数据已同步
     *
     * @param e
     * @param tableNames 表名集合
     */
    (e: 'synchronized', tableNames: string[]): void;
  }>();

  /**
   * 同步
   *
   * @return 是否成功
   */
  const syncAsync = async (): Promise<void> => {
    try {
      renderData.processing = true;
      if (renderData.tableNames.length == 0) {
        ElMessage({
          type: 'error',
          message: '请先选择数据',
        });
        return;
      }

      // 同步
      const msg: string = await TableService.sync(renderData.tableNames);
      ElMessage({
        type: 'success',
        message: msg,
      });
      emit('synchronized', renderData.tableNames);
      renderData.processing = false;
    } catch (ex: any) {
      renderData.processing = false;
      console.error(ex);
      ElMessage({
        type: 'error',
        message: ex.message,
      });
    }
  };

  /**
   * 初始化方法
   */
  (async () => {
    //获取所有表
    try {
      renderData.tableMap = await TableService.tableMap();
      renderData.loading = false;
    } catch (ex: any) {
      console.error(ex);
      ElMessage({
        type: 'error',
        message: ex.message,
      });
    }
  })();
</script>
<style scoped></style>
