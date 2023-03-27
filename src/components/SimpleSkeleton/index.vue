<!--
简单骨架框组件

使用配置数据生成各种布局的骨架框
使用示例：
  <template>
    <simple-skeleton :loading="loading"/>
  </template>

  <script lang="ts" setup>
  import {reactive} from "vue";
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';

  const loading = reactive(true);
  </script>

@author LCTR
@date 2022-07-25
-->

<template>
  <el-skeleton
    v-if="props.loading"
    :loading="props.loading"
    animated
    :throttle="500"
  >
    <template #template>
      <el-row
        v-for="(cells, rowIndex) in props.lattice"
        :key="rowIndex"
        :gutter="20"
      >
        <el-col
          v-for="(cell, cellIndex) in cells"
          :key="`${rowIndex}_${cellIndex}`"
          :span="cell.width"
        >
          <el-skeleton-item :variant="cell.type" />
        </el-col>
      </el-row>
    </template>
    <template #default> </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
  import CellConfig from '@/components/SimpleSkeleton/Model/CellConfig';
  import { reactive } from 'vue';

  /**
   * 渲染数据
   */
  const renderData = reactive({});

  // 组件属性
  const props = withDefaults(
    defineProps<{
      /**
       * 加载状态
       *
       * @默认值 true
       */
      loading: boolean;
      /**
       * 结构配置
       */
      lattice?: Array<CellConfig[]>;
    }>(),
    {
      loading: true,
      lattice: () => [
        [new CellConfig(6)],
        [new CellConfig()],
        [new CellConfig(18)],
        [new CellConfig(24)],
        [new CellConfig(), new CellConfig()],
        [new CellConfig(18)],
        [new CellConfig(24)],
      ],
    }
  );
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .el-skeleton__item {
    min-height: 20px;
  }
</style>
