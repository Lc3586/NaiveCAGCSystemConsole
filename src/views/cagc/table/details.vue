<template>
  <simple-skeleton :loading="renderData.loading" />
  <el-form v-if="!renderData.loading">
    <el-form-item label="表名：" prop="name">
      {{ data.name }}
    </el-form-item>
    <el-form-item label="标题/名称：" prop="title">
      {{ data.title }}
    </el-form-item>
    <el-form-item label="所属分组：" prop="group">
      {{ data.group }}
    </el-form-item>
    <el-form-item label="署名：" prop="signature">
      {{ data.signature }}
    </el-form-item>
    <el-form-item label="描述：" prop="description">
      {{ data.description }}
    </el-form-item>

    <el-form-item label="业务名称：" prop="businessName">
      {{ data.businessName }}
    </el-form-item>
    <el-form-item label="所属模块：" prop="moduleName">
      {{ data.moduleName }}
    </el-form-item>

    <el-form-item label="其它选项：" prop="optionList">
      <tag-list
        name="选项"
        :list="data.optionList"
        :type="DataType.字符串"
        :readonly="true"
      >
      </tag-list>
    </el-form-item>

    <el-form-item label="创建者：" prop="createBy">
      {{ data.createBy }}
    </el-form-item>
    <el-form-item label="创建时间：" prop="createTime">
      {{ data.createTime }}
    </el-form-item>
    <el-form-item label="更新者：" prop="updateBy">
      {{ data.updateBy }}
    </el-form-item>
    <el-form-item label="更新时间：" prop="updateTime">
      {{ data.updateTime }}
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { Detail } from '@/api/dto/cagc/table/Detail';
  import TableService from '@/api/service/cagc/TableService';
  import { reactive, toRefs } from 'vue';
  import { ElMessage } from 'element-plus';
  import { DataType } from '@/components/SimpleTagList/Model/DataType';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 数据
     */
    data: {} as Detail,
  });

  /**
   * 单独解构的属性
   */
  const { data } = toRefs(renderData);

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 数据Id
       */
      id: string;
    }>(),
    {
      id: '',
    }
  );

  /**
   * 初始化方法
   */
  (async () => {
    if (!props.id) {
      ElMessage({
        type: 'warning',
        message: '操作有误',
      });
      return;
    }

    //写入数据
    try {
      renderData.data = await TableService.detail(props.id);
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
