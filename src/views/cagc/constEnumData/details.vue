<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成		  															                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 16:21:50                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


常量/枚举数据详情页

author admin
date 2022-07-04

-->
<template>
  <simple-skeleton :loading="renderData.loading" />

  <el-form v-if="!renderData.loading">
    <el-form-item label="所属常量/枚举：" :prop="CED_Fields.cEId">
      {{ renderData.data.cEId }}
    </el-form-item>

    <el-form-item label="创建者：" :prop="CED_Fields.createBy">
      {{ renderData.data.createBy }}
    </el-form-item>

    <el-form-item label="创建时间：" :prop="CED_Fields.createTime">
      {{ renderData.data.createTime }}
    </el-form-item>

    <el-form-item label="键：" :prop="CED_Fields.key">
      {{ renderData.data.key }}
    </el-form-item>

    <el-form-item label="描述：" :prop="CED_Fields.description">
      {{ renderData.data.description }}
    </el-form-item>

    <el-form-item label="备注：" :prop="CED_Fields.remark">
      {{ renderData.data.remark }}
    </el-form-item>

    <el-form-item label="更新者：" :prop="CED_Fields.updateBy">
      {{ renderData.data.updateBy }}
    </el-form-item>

    <el-form-item label="更新时间：" :prop="CED_Fields.updateTime">
      {{ renderData.data.updateTime }}
    </el-form-item>

    <el-form-item label="值：" :prop="CED_Fields.value">
      {{ renderData.data.value }}
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { Detail } from '@/api/dto/cagc/constEnumData/Detail';
  import { CED_Fields } from '@/api/dto/cagc/constEnumData/CED_Fields';
  import ConstEnumDataService from '@/api/service/cagc/ConstEnumDataService';
  import { reactive } from 'vue';
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
      renderData.data = await ConstEnumDataService.detail(props.id);
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
